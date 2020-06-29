---
title: Testing
description: How do you know if the system you built works? The easy answer we usually don't. Still we can become more confident, thats where testing comes in
color: "#15C213"
---

How do you know if the system you built works? Through testing it! But testing different aspects of your system manually (i.e. by entering text into input fields and clicking buttons yourself) can be tedious, and take up a lot of time. This is why developers rely on tools which run through a defined list of expectations to fulfill and alert the developer if one (or many) outcomes did not turn out as expected.

## Unit Testing

**Unit testing** is where individual parts of an application (each 'unit') are tested in isolation from one another. So, for example, in a standard calculator app, you would test the `add` function first to see if numbers add together and produce an expected result, and then the `subtract` function to see if numbers subtract from each other and produce an expected result, and then the `multiply` function, etc.

### Tools

[Jest](https://jestjs.io/) - developed and maintained by Facebook and contributors. Partnered most often with React but works just as well with other JS frameworks.

[Mocha](https://mochajs.org/) - more simple, and configurable. Ideal for developers who seek complete control over their unit testing environment.

### Tutorials

[How to use React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library) - A great introduction on how to use Kent C Dodd's (who I am a big fan of) testing framework.

## End to End testing

**End to end testing** is where the relationship between multiple parts of an application are tested. It simulates how the user would use the application, wherein multiple components are involved and rely on one another. As a simple example, when the user clicks on the "[hamburger button](https://en.wikipedia.org/wiki/Hamburger_button)" (component one), does the correct menu (component two) appear? For a more complex example, when the user submits data through a form (component one), is that data submitted to the database (component two) correctly?

### Tools

[Cypress](https://www.cypress.io) - Cypress io is an open source end to end testing framework for testing anything that runs in the browser.
