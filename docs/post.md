# The Best Testing Tools for Node.js

Testing is an important discipline for *any* non-trivial software project. With a dynamic language like JavaScript, testing is an absolute necessity. This post is on the best tools currently available for Node.js, but here's a quick look at some of the many benefits of testing.

* Find bugs!
* Guard against future bug regressions.
* Document the expected functionality or behavior of software.
* Improve the design, quality, and maintainability of software.
* Refactor code with confidence.

In this post, we'll look at the current tools available for Node.js for running automated tests, helpful testing utilities, and end with some tools specific for testing Electron desktop applications.

> Note: Although some of tools covered support user interface (UI) tests and front-end integration tests, the focus of this post is on testing pure back-end Node.js code. If you are looking for UI testing, take a peek at [Storybook](https://storybook.js.org/), [Cypress](https://www.cypress.io/), or [Puppeteer](https://pptr.dev/).

## The Best Tools for Running Node.js Automated Tests

The foundation for testing is automation. With every code change and at various stages along the way to production, all the available tests should run in an automated fashion. At the heart of automated tests is a good test runner.

For each of these tools, I've included a sample unit test so you can see the relative similarities and differences of using these frameworks. The code being tested is a very simple calculator module. Here is the code for `calc.js`.

```js
"use strict";

module.exports = {
  add: ( num1, num2 ) => {
    return num1 + num2;
  },
  badd: () => {
    throw new Error( "it blowed up" );
  }
};
```

### Mocha

[Mocha](https://mochajs.org/) is one of the oldest and most well-known testing frameworks for Node.js. It's evolved with Node.js and the JavaScript language over the years, such as supporting callbacks, promises, and `async`/`await`, and has picked up a few tricks inspired by other test runners.

```js
"use strict";

const assert = require( "assert" );
const calc = require( "../src/calc" );

describe( "Calculator", () => {
  before( () => {
    console.log( "before executes once before all tests" );
  } );

  after( () => {
    console.log( "after executes once after all tests" );
  } );

  describe( "adding", () => {
    beforeEach( () => {
      console.log( "beforeEach executes before every test" );
    } );
    it( "should return 4 when adding 2 + 2", () => {
      assert.equal( calc.add( 2, 2 ), 4 );
    } );

    it( "should return 0 when adding zeros", () => {
      assert.equal( calc.add( 0, 0 ), 0 );
    } );
  } );

  describe( "error", () => {
    it( "should return an error", () => {
      assert.throws( calc.badd, {
        name: "Error",
        message: "it blowed up"
      } );
    } );
  } );
} );
```

You can write test-driven-development (TDD) or behavior-driven-development (BDD) style tests. It has hooks such as `before`, `beforeEach`, `after`, and `afterEach` for test setup and teardown. It also comes with a number of built-in reporters to format output.

By itself, Mocha is a solid no-frills test runner that   Mocha can be supplemented with other testing utilities to add features like code coverage and mocking (simulated objects/integration). 

### Jest

[Jest](https://jestjs.io/)

### Lab

[Lab](https://github.com/hapijs/lab)

### AVA

[AVA](https://github.com/avajs/ava)

### Tape

### Comparison

## The Best Testing Utilities for Node.js

### TestDouble

### Sinon

### Chai

### Puppeteer

### Visual Studio Code

### TypeScript

## The Best Testing Tools for Electron

### Spectron

### electron-mocha