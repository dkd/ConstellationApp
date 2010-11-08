class Filter < ActiveRecord::Base
  belongs_to :view

  def equals
    property=="date" ? Time.parse(@equals) : @equals
  end
end