"use strict";

const test = require( "ava" );
const calc = require( "../../src/calc" );

test( "err should return an error", t => {
	const err = t.throws( () => {
		calc.badd();
	} );
	t.is( err.message, "it blowed up" );
} );
