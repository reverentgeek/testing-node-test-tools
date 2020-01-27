"use strict";

const assert = require( "assert" );
const td = require( "testdouble" );

describe( "Mocked calculator", () => {
	let calc;
	beforeEach( () => {
		calc = td.replace( "../src/calc" );
	} );

	afterEach( () => {
		td.reset();
	} );

	it( "should return 5 when adding 2 + 2?", () => {
		const add2 = require( "../src/add2" );
		td.when( calc.add( 2, 2 ) ).thenReturn( 5 );
		assert.equal( add2( 2 ), 5 );
	} );

	it( "should return 0 when adding 2 + 2?", () => {
		const add2 = require( "../src/add2" );
		td.when( calc.add( 2, 2 ) ).thenReturn( 0 );
		assert.equal( add2( 2, 2 ), 0 );
	} );
} );
