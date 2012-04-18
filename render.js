/**
 * LHTML Module - Render Feature
 * @author Nate Ferrero
 */
module.exports = function(lhtml) {

	/**
	 * Dependencies
	 * @author Nate Ferrero
	 */
	var fs = require('fs');

	/**
	 * Render Method
	 * 
	 * @param File
	 * @param Scope
	 * @param Callback
	 * 
	 * @author Nate Ferrero
	 */
	lhtml.render = function(file, scope, callback) {
		console.log("Rendering LHTML File:", file);

		/**
		 * Read file and parse
		 * @author Nate Ferrero
		 */
		fs.readFile(file, 'utf8', function(error, string) {
			if(error)
				return callback(error, null);
			lhtml.parse(string, function(stack) {
				console.log("LHTML Scope: ", scope);
				console.log("LHTML Stack: ", stack);
				return callback(null, "Found LHTML file to render at: " + file);
			});
		});
	}
}