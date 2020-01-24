"use strict";

const test = require( "tape" );
const calc = require( "../src/calc" );

test( "Calculator", t => {
	function beforeEach() {
		console.log( "beforeEach executes before every test" );
	}

	t.test( "before all", t2 => {
		console.log( "something before all the other tests" );
		t2.end();
	} );

	t.test( "adding", t2 => {
		t2.test( "should return 4 when adding 2 + 2", t3 => {
			beforeEach(); // explicitly call beforeEach
			t3.plan( 1 );
			t3.is( calc.add( 2, 2 ), 4 );
		} );
		t2.test( "should return 0 when adding zeros", t3 => {
			beforeEach(); // explicitly call beforeEach
			t3.plan( 1 );
			t3.is( calc.add( 0, 0 ), 0 );
		} );
	} );

	t.test( "should throw an error", t2 => {
		beforeEach(); // explicitly call beforeEach
		t2.plan( 2 );
		t2.throws( calc.badd );
		try {
			calc.badd();
		} catch( err ) {
			t2.equal( err.message, "it blowed up" );
		}
	} );

	t.test( "after all", t2 => {
		console.log( "something after all the other tests" );
		t2.end();
	} );
} );
