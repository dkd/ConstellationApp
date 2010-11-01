require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

Given /^a log entry "([^\"]*)" exists$/ do |message|
  @log_entry = Constellation::LogEntry.new("#{Time.now.strftime('%a %d %H:%M:%S')} www0 ruby: #{message}")
  Constellation::DataStore.instance.insert(@log_entry)
end

Given /^I have "([^\"]*)" users$/ do |user_count|
  user_count.to_i.times { |i|
    User.create(:email => "testuser-#{i}@constellationapp.org", :password => "password", :password_confirmation => "password")
  }
end

When /^I click "([^\"]*)"$/ do |path|
  @log_entry_element = find(:xpath, path)
  @log_entry_element.click
end

When /^I click the "([^\"]*)" link$/ do |link_name|
  find(:xpath, "//a[text()='#{link_name}']").click
end

Then /^I should see the log entries' details$/ do
  Then %{I should see "View details"}
  And %{I should see "#{@log_entry_element.text}"}
end

Then /^I should see all users$/ do
  User.find(:all).each { |user|
    Then %{I should see "#{user.email}"}
  }
end