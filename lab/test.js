"use strict";

const Code = require( "@hapi/code" );
const Lab = require( "@hapi/lab" );

const { expect } = Code;
const { experiment, it, before, after, beforeEach } = exports.lab = Lab.script();

const calc = require( "../src/calc" );

experiment( "Calculator", () => {
	before( () => {
		console.log( "beforeAll executes once before all tests" );
	} );

	after( () => {
		console.log( "afterAll executes once after all tests" );
	} );

	experiment( "adding", () => {
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

	experiment( "error", () => {
		it( "should throw an error", () => {
			try {
				calc.badd();
			} catch ( err ) {
				expect( err ).to.be.an.error( "it blowed up" );
			}
		} );
	} );
} );
