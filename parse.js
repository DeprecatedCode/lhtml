/**
 * LHTML Module - Parse Feature
 * @author Nate Ferrero
 */
module.exports = function(lhtml) {

	/**
	 * Dependencies
	 * @author Nate Ferrero
	 */
	var grammar 	= require('./grammar.js'),
		lexer 		= require('lexer');

	/**
	 * Parse Method
	 * 
	 * @param File
	 * @param Callback
	 * 
	 * @author Nate Ferrero
	 */
	lhtml.parse = function(string, callback) {

		/**
		 * Tokenize with the lexer module
		 * @author Nate Ferrero
		 */
		var tokens = lexer(string, grammar);
		var stack = {};
		var node = stack;
		console.log("LHTML Tokens:", tokens);

		/**
		 * Callback with LHTML Nodes
		 * @author Nate Ferrero
		 */
		callback(null, stack);
	}
}