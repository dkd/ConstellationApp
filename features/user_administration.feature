Feature: User administration
  In order to manage users
  As an administrator
  I want to use an administration

  Scenario: List users
    Given I have "3" users
    And I am authenticated as an admin
    When I go to the views page
    And I click the "Users" link
    Then I should see all users