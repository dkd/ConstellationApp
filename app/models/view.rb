class View < ActiveRecord::Base
  has_one :filter
  belongs_to :user

  after_save :create_filter

  accepts_nested_attributes_for :filter

  #
  # Parses the associated filters and renders the log entries
  #
  def render
    LogEntry.all(:reversed => true) if filter.property.empty? || filter.query_type.empty?
    case filter.query_type
    when "compare"
      if filter.property=="date"
        LogEntry.where(:date => [Time.parse(filter.equals), Time.parse(filter.equals+'.999')])
      else
        LogEntry.where(filter.property.to_sym => filter.equals)
      end
    when "range"
      if filter.property=="date"
        filter.start  = filter.start  ? Time.parse(filter.start) : Time.now
        filter.end    = filter.end    ? Time.parse(filter.end+'.999') : Time.now
      end
      LogEntry.where(filter.property.to_sym => [filter.start, filter.end])
    end
  rescue NoMethodError
    LogEntry.all(:reversed => true)
  end

  #
  # Creates an associated filter, if no one exists
  #
  def create_filter
    build_filter.save if filter.nil?
  end
end
