Feature: Sign in
  In order to sign in
  As a role
  I want to see the login form

  Scenario: Login form
    Given I am not authenticated
    When I go to the views page
    Then I should be on the root page
    And I should see "Email"
    And I should see "Password"
