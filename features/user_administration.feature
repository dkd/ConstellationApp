Feature: User administration
  In order to manage users
  As an administrator
  I want to use an administration

  @javascript
  Scenario: List users
    Given I am authenticated as an admin
    And I have "3" users
    When I go to the views page
    And I click the "Users" link
    And I should see all users