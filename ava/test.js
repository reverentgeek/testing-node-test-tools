"use strict";

const test = require( "ava" );
const calc = require( "../src/calc" );

test.before( () => {
	console.log( "beforeAll executes once before all tests" );
} );

test.after( () => {
	console.log( "afterAll executes once after all tests" );
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
