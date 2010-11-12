require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "base"))

Given /^a log entry "([^\"]*)" exists$/ do |message|
  @log_entry = Constellation::LogEntry.new("#{Time.now.strftime('%a %d %H:%M:%S')} www0 ruby: #{message}")
  Constellation::DataStore.instance.insert(@log_entry)
end

Given /^a log entry "([^\"]*)" from "([^\"]*)" exists$/ do |message, property_value|
  case property_value
  when "today"
    @log_entry = Constellation::LogEntry.new("#{Time.now.strftime('%a %d %H:%M:%S')} www0 ruby: #{message}")
  else
    @log_entry = Constellation::LogEntry.new("#{Time.now.strftime('%a %d %H:%M:%S')} www0 #{property_value}: #{message}")
  end
  Constellation::DataStore.instance.insert(@log_entry)
end

Given /^I have "([^\"]*)" users$/ do |user_count|
  user_count.to_i.times { |i|
    User.new(:email => "testuser-#{i}@constellationapp.org", :password => "password", :password_confirmation => "password").save!
  }
end

Given /^I have a view named "([^\"]*)" exists$/ do |title|
  @user.views.create(:title => title)
end

When /^I click "([^\"]*)"$/ do |path|
  @log_entry_element = find(:xpath, path)
  @log_entry_element.click
end

When /^I click the "([^\"]*)" link$/ do |link_name|
  find(:xpath, "//a[text()='#{link_name}']").click
end

When /^I add the range from "([^"]*)" to "([^"]*)"$/ do |start_date, end_date|
  one_day = 60*60*24
  start_date = parse_human_date(start_date)
  end_date   = parse_human_date(end_date)
  When %{I fill in "start" with "#{start_date}"}
  When %{I fill in "start" with "#{end_date}"}
end

Then /^I should see the log entries details$/ do
  Then %{I should see "View details"}
  And %{I should see "#{@log_entry_element.text}"}
end

Then /^I should see all users$/ do
  User.find(:all).each { |user|
    Then %{I should see "#{user.email}"}
  }
end

Then /^I should see a log entry from the "([^\"]*)" application$/ do |application_name|
  find(:xpath, "//div[contains(concat(' ',normalize-space(@class),' '),' x-grid3-col-application ')]").text.should eql(application_name)
end