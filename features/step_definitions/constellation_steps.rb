require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

Given /^a log entry "([^\"]*)" exists$/ do |message|
  log_entry = Constellation::LogEntry.new("Oct 28 15:47:54 www0 ruby[42]: #{message}")
  Constellation::DataStore.instance.insert(log_entry)
end