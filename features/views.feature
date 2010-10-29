Feature: Views
  In order to view log entries
  As an user
  I want to use views

  @javascript
  Scenario: View log entries
    Given I am a new, authenticated user
    And a log entry "Ruby rocks" exists
    When I go to the home page
    Then I should see "Ruby rocks"