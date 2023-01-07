/// <reference types="cypress" />
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      "username": "Maiko",
      "name": "Okti",
      "password": "okiska"
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()

    cy.contains('log in')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.contains('log in').click()
    })

    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('Maiko')
      cy.get('#input-password').type('okiska')
      cy.contains('Log in').click()

      cy.contains('logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('Maka')
      cy.get('#input-password').type('Kaka')
      cy.contains('Log in').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#input-username').type('Maiko')
      cy.get('#input-password').type('okiska')
      cy.contains('Log in').click()
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#input-title').type('titleTest')
      cy.get('#input-author').type('authorTest')
      cy.get('#input-url').type('urlTest')

      cy.get('#create-blog-button').click()
      cy.contains('added')
    })
  })
})