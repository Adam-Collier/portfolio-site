---
title: Testing
description: >-
  Javascript focussed testing (mostly leaning towards React). Including tutorials on Unit testing and End to End testing.
color: '#15C213'
updatedDate: '2020-07-14T14:27:20+01:00'
---

How do you know if the system you built works? Through testing it! But testing different aspects of your system manually (i.e. by entering text into input fields and clicking buttons yourself) can be tedious, and take up a lot of time. This is why developers rely on tools which run through a defined list of expectations to fulfill and alert the developer if one (or many) outcomes did not turn out as expected.

## Unit Testing

**Unit testing** is where individual parts of an application (each 'unit') are tested in isolation from one another. So, for example, in a standard calculator app, you would test the `add` function first to see if numbers add together and produce an expected result, and then the `subtract` function to see if numbers subtract from each other and produce an expected result, and then the `multiply` function, etc.

### Tools

[Jest](https://jestjs.io/) - Framework - Testing Framework - Developed and maintained by Facebook and contributors. Pretty much the go to for React and can be used alongside React Testing Library.

### Tutorials

[How to use React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library) - Read/Tutorial - A great introduction on how to use Kent C Dodd's (who I am a big fan of) testing framework. Everyone should learn at least one thing from this article.

## End to End testing

**End to end testing** is where the relationship between multiple parts of an application are tested. It simulates how the user would use the application, wherein multiple components are involved and rely on one another. As a simple example, when the user clicks on the "[hamburger button](https://en.wikipedia.org/wiki/Hamburger_button)" (component one), does the correct menu (component two) appear? For a more complex example, when the user submits data through a form (component one), is that data submitted to the database (component two) correctly?

### Tools

[Cypress.io](https://www.cypress.io) - Easily Write Tests - Cypress io is an open source end to end testing framework for testing anything that runs in the browser. Follow the whole user journey and easily pick up on any issues a long the way.
