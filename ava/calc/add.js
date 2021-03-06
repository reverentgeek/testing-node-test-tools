"use strict";

const test = require( "ava" );
const calc = require( "../../src/calc" );

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

test.todo( "should return a number if passed a string" );
