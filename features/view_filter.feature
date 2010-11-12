Feature: View filter
  In order to see only log entries I am interested in
  As an user
  I want to define filters on attributes

  @cassandra
  Scenario: Show only an application's logs
    Given I am a new, authenticated user
    And a log entry "Hello, mates!" from "Safari" exists
    And I have a view named "Log entries" exists
    And I am on the home page
    When I press "Settings"
    And I fill in "Property:" with "Application"
    And I fill in "Query type:" with "Compare"
    And I fill in "Equals:" with "Safari"
    And I press "Save"
    Then I should see a log entry from the "Safari" application