/**
 * LHTML Module - Render Feature
 * @author Nate Ferrero
 */
module.exports = function(lhtml) {

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
		console.log("LHTML Scope: ", scope);
		callback("Found LHTML file to render at: " + file);
	}
}