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

For each of the following tools, I've included a sample set of tests so you can see the basic similarities and differences between these frameworks. The code being tested is a very simple calculator module named `calc.js`. Here is the code for `calc.js`.

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

Mocha adds a number of global functions, such as `describe`, `test`, `it`, `specify`, `setup`, `teardown`, which can be used to write test-driven-development (TDD) or behavior-driven-development (BDD) style tests. It has hooks such as `before`, `beforeEach`, `after`, and `afterEach` for test setup and teardown. It also comes with a number of built-in reporters to format output.

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

Output:

```sh
  Calculator
before executes once before all tests
    adding
beforeEach executes before every test
      ✓ should return 4 when adding 2 + 2
beforeEach executes before every test
      ✓ should return 0 when adding zeros
    error
      ✓ should return an error
after executes once after all tests


  3 passing (5ms)
```

By itself, Mocha is a solid no-frills test runner. Mocha can be supplemented with other testing utilities to add features like code coverage and mocking (simulated objects/integration). It has a large community following with lots of tools and plugins available to customize it fit your needs.

### Jest

[Jest](https://jestjs.io/) is a testing framework developed by Facebook. Originally designed to make UI testing easier for React developers, it's now a full standalone suite of tools for any type of JavaScript project (including Node.js) and includes features such as a built-in assertion library, code coverage, and mocking. Jest also runs multiple test suites concurrently, which can speed up the overall testing process.

For anyone coming from a BDD-style of Mocha, Jest tests are pretty familiar looking. Jest adds a number of global functions to help with setting up and running tests, such as `describe`, `it`, `expect`, and the `jest` object (used mostly for mocking).

```js
"use strict";

// jest.mock( "../src/calc" );
const calc = require( "../src/calc" );

describe( "Calculator", () => {
  beforeAll( () => {
    console.log( "beforeAll executes once before all tests" );
    // calc.add.mockImplementation( () => -1 );
  } );

  afterAll( () => {
    console.log( "afterAll executes once after all tests" );
  } );

  describe( "adding", () => {
    beforeEach( () => {
      console.log( "beforeEach executes before every test" );
    } );

    it( "should return 4 when adding 2 + 2", () => {
      expect( calc.add( 2, 2 ) ).toBe( 4 );
    } );

    it( "should return 0 when adding zeros", () => {
      expect( calc.add( 0, 0 ) ).toBe( 0 );
    } );
  } );

  describe( "err", () => {
    it( "should return an error", () => {
      expect( calc.badd ).toThrowError( "it blowed up" );
    } );
  } );
} );
```

Output:

```sh
 PASS  jest/test.js
  Calculator
    adding
      ✓ should return 4 when adding 2 + 2 (3ms)
      ✓ should return 0 when adding zeros (1ms)
    err
      ✓ should return an error (2ms)

  console.log jest/test.js:8
    beforeAll executes once before all tests

  console.log jest/test.js:18
    beforeEach executes before every test

  console.log jest/test.js:18
    beforeEach executes before every test

  console.log jest/test.js:13
    afterAll executes once after all tests

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 calc.js  |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.036s
```

Jest has become hugely popular in the JavaScript community, and not just for React developers. There are a ton of library extensions, plugins, and other tools to customize Jest however you see fit. Plus, if you're also creating UIs, Jest has an advantage of supporting popular UI frameworks like React, Angular, and Vue.

### Lab and Code

[Lab](https://github.com/hapijs/lab) is part of the hapi developer ecosystem. It was originally designed by Walmart Labs to work seamlessly with the hapi web framework. However, it works well on its own and with other Node.js frameworks. `Lab`, the test runner, typically goes hand-in-hand with [`code`](https://github.com/hapijs/code), the BDD-style assertion library created for it.

Lab includes code coverage, a number of reporters, the ability to load a custom reporter, and was one of the first JavaScript test runners to detect memory leaks. Another cool feature of lab is the ability to randomize the order tests are executed. This may uncover some obscure bugs in your code, such as leaking state or calling a promise or `async` function without awaiting the result.

In contrast to most other test runners, Lab *does not* add any global functions. This requires more setup for every suite of tests to import the `lab` and `code` dependencies. However, no globals means there are no surprises when it comes to using the API.

```js
"use strict";

const Code = require( "@hapi/code" );
const Lab = require( "@hapi/lab" );

const { expect } = Code;
const { describe, it, before, after, beforeEach } = exports.lab = Lab.script();

const calc = require( "../src/calc" );

describe( "Calculator", () => {
  before( () => {
    console.log( "beforeAll executes once before all tests" );
  } );

  after( () => {
    console.log( "afterAll executes once after all tests" );
  } );

  describe( "adding", () => {
    beforeEach( () => {
      console.log( "beforeEach executes before every test" );
    } );

    it( "should return 4 when adding 2 + 2", () => {
      expect( calc.add( 2, 2 ) ).to.equal( 4 );
    } );

    it( "should return 0 when adding zeros", () => {
      expect( calc.add( 0, 0 ) ).to.equal( 0 );
    } );
  } );

  describe( "error", () => {
    it( "should throw an error", () => {
      try {
        calc.badd();
      } catch ( err ) {
        expect( err ).to.be.an.error( "it blowed up" );
      }
    } );
  } );
} );
```

Output:

```sh
beforeAll executes once before all tests
beforeEach executes before every test
Calculator
  adding
    ✔ 1) should return 4 when adding 2 + 2 (1 ms)
beforeEach executes before every test
    ✔ 2) should return 0 when adding zeros (0 ms)
  error
    ✔ 3) should throw an error (0 ms)
afterAll executes once after all tests


3 tests complete
Test duration: 6 ms
Leaks: No issues
Coverage: 100.00%
```

In my experience, Lab works great. Unfortunately, it is not very well known outside of the hapi community.

### AVA

[AVA](https://github.com/avajs/ava) is a much more opinionated test runner. Like lab, there are no magic global functions. Like Jest, it executes tests in parallel, which can speed up test performance.

AVA does not have an equivalent syntax of `describe` for grouping tests. Instead, you must use the file system to group tests by folder (or nested folders) and file name.

```js
"use strict";

const test = require( "ava" );
const calc = require( "../src/calc" );

test.before( () => {
  console.log( "before executes once before all tests" );
} );

test.after( () => {
  console.log( "after executes once after all tests" );
} );

test.beforeEach( () => {
  console.log( "beforeEach executes before every test" );
} );

test( "should return 4 when adding 2 + 2", t => {
  t.is( calc.add( 2, 2 ), 4 );
} );

test( "should return 0 when adding zeros", t => {
  t.is( calc.add( 0, 0 ), 0 );
} );

test( "err should return an error", t => {
  const err = t.throws( () => {
    calc.badd();
  } );
  t.is( err.message, "it blowed up" );
} );
```

Output:

```sh
⠹ before executes once before all tests
⠸ beforeEach executes before every test
⠼ beforeEach executes before every test
beforeEach executes before every test
⠇ err should return an error

  3 tests passed
```

### Comparison

|Framework|Parallel Testing|Globals|
|:---|:---:|:---:|
|Ava|✅|🚫|
|Jest|✅|✅|
|lab + code|🚫|🚫|
|Mocha|🚫|✅|

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