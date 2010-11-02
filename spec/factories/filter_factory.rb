Factory.define :filter do |f|
  f.property    "application"
  f.query_type  "compare"
  f.equals      "ruby"
end