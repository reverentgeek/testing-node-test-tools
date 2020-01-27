"use strict";

const { expect, should } = require( "chai" );
const calc = require( "../src/calc" );

describe( "Calculator", () => {
	before( () => {
		should();
	} );

	describe( "adding", () => {
		it( "should return 4 when adding 2 + 2", () => {
			expect( calc.add( 2, 2 ) ).to.equal( 4 );
		} );
	} );

	describe( "strings", () => {
		it( "should be a string", () => {
			try {
				calc.badd();
			} catch ( err ) {
				err.message.should.be.a( "string" )
					.with.lengthOf( 12 )
					.and.equal( "it blowed up" );
			}
		} );
	} );
} );
