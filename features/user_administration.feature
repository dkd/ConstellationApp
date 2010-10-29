Feature: User administration
  In order to manage users
  As an administrator
  I want to use an administration

  @javascript
  Scenario: List users
    Given I am authenticated as an admin
    And I am on the home page
    When I click "Users"
    Then I should see all users