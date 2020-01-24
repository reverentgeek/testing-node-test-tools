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
