class View < ActiveRecord::Base
  has_one :filter
  belongs_to :user

  accepts_nested_attributes_for :filter

  #
  # Parses the associated filters and renders the log entries
  #
  def render
    case filter.query_type
    when "compare"
      LogEntry.where(:property => filter.property, :equals => filter.equals)
    when "range"
      LogEntry.where(:property => filter.property, :start => filter.start, :end => filter.end)
    end
  rescue NoMethodError
    LogEntry.all(:reversed => true)
  end
end
