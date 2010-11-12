Feature: Views
  In order to view log entries
  As an user
  I want to use views

  @cassandra
  Scenario: View log entries
    Given I am a new, authenticated user
    And a log entry "Ruby rocks" exists
    And I have a view named "Log entries" exists
    When I go to the home page
    Then I should see "Ruby rocks"

  @cassandra
  Scenario: View log entries' details
    Given I am a new, authenticated user
    And a log entry "Ruby rocks" exists
    And I have a view named "Log entries" exists
    When I go to the home page
    And I click "//div[contains(concat(' ',normalize-space(@class),' '),' x-grid3-col-message ')]"
    Then I should see the log entries details