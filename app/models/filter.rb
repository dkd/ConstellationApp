class Filter < ActiveRecord::Base
  belongs_to :view

  validates_presence_of   :property,   :query_type
  validates_inclusion_of  :property,   :in => %(date machine application)
  validates_inclusion_of  :query_type, :in => %(compare range)
end