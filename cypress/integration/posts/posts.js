import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.task('cleanDB');

  window.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWM3ZWUzMWU3NjA4OGVlOWZhYmIxYiIsInVzZXJuYW1lIjoiY3lwcmVzcyIsImlhdCI6MTU4NzMxNzEwMH0.OxFHmA7_xtkc5FpiSV2M8WXnBVEGfOP_v3FNJCglyiY');
});

Given('I visit {string} page', url => {
  cy.visit(url);
});
Given('I click {string} link', linkName => {
  cy.get(`[data-cy="${linkName}-link"]`).click();
});
Given('I enter {string} as article title', title => {
  cy.get('[data-cy="article-title-input"]').type(title);
});
Given('I enter {string} as article topic', topic => {
  cy.get('[data-cy="article-topic-input"]').type(topic);
});
Given('I enter {string} as article content', content => {
  cy.get('[data-cy="article-content-input"]').type(content);
});
Given('I enter {string} as article tags', tags => {
  cy.get('[data-cy="article-tags-input"]').type(tags);
});


When('I click {string} tab', tabName => {
  cy.get(`[data-cy="${tabName}-tab"]`).click();
});
When('I click {string} button', buttonName => {
  cy.get(`[data-cy="${buttonName}-button"]`).click();
});


Then(`I see I've been redirected to url containing {string}`, url => {
  cy.location('pathname').should('contain', url);
});
Then('I see {string} as article title', title => {
  cy.get('[data-cy="article-title"]').should('have.text', title);
});
Then('I see {string} as article content', content => {
  cy.get('[data-cy="article-content"]').should('have.text', `${content}\n`);
});
Then('I see the {string} article with description {string} created by {string}', (title, description, user) => {
  cy
    .get('[data-cy="article-list"]')
    .contains('[data-cy="article-title"]', title)
    .closest('[data-cy="article-container"]')
    .contains('[data-cy="article-description"]', description)
    .closest('[data-cy="article-container"]')
    .contains('[data-cy="article-author"]', user);
});
