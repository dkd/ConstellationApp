Feature: Authentication
  In order to authenticate
  As a user
  I want sign in and sign out

  Scenario: Sign in form
    Given I am not authenticated
    When I go to the views page
    Then I should be on the sign in page
    And I should see "Email"
    And I should see "Password"

  Scenario: Sign in
    Given I am not authenticated
    And I have one user "testing@constellationapp.org" with password "topsecret" and login "Testing guy"
    When I go to the sign in page
    And I fill in "user_email" with "testing@constellationapp.org"
    And I fill in "user_password" with "topsecret"
    And I press "Sign in"
    Then I should be on the home page

  Scenario: Sign out
    Given I am a new, authenticated user
    When I go to the sign out page
    Then I should be on the sign in page