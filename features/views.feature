Feature: Views
  In order to view log entries
  As an user
  I want to use views

  @cassandra
  Scenario: View log entries
    Given a log entry "Ruby rocks" exists
    And I am a new, authenticated user
    When I go to the home page
    Then I should see "Ruby rocks"

  @javascript, @cassandra
  Scenario: View log entries' details
    Given I am a new, authenticated user
    And a log entry "Ruby rocks" exists
    When I go to the home page
    And I click "//div[@class='x-grid3-cell-inner x-grid3-col-message']"
    Then I should see the log entries' details