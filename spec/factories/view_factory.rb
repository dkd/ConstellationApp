Factory.define :view do |v|
  v.title "All log entries"
  v.association :filter, :factory => :filter
end