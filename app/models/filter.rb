#
# Saves query options for an associated view
#
class Filter < ActiveRecord::Base
  belongs_to :view
end
