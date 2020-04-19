Feature: Post CRUD

  Scenario: Creating a new post
    Given I visit "/" page
    And I click "new-post" link
    And I enter "Cypress article" as article title
    And I enter "Is it difficult to configure Cypress?" as article topic
    And I enter "Cypress is great and very easy to configure even with cucumber!" as article content
    And I enter "tests cypress e2e" as article tags
    When I click "publish-article" button
    Then I see I've been redirected to url containing "article/cypress-article"
    And I see "Cypress article" as article title
    And I see "Cypress is great and very easy to configure even with cucumber!" as article content

  Scenario Outline: Viewing a list of posts
    Given I visit "/" page
    When I click "global-feed" tab
    Then I see the "<title>" article with description "<description>" created by "<author>"

    Examples:
      | title                  | description                | author  |
      | Cypress test article 1 | Cypress test description 1 | cypress |
      | Cypress test article 2 | Cypress test description 2 | cypress |
      | Cypress test article 3 | Cypress test description 3 | cypress |
