/**
 * LHTML Module - Route Feature
 * @author Nate Ferrero
 */
module.exports = function(lhtml) {

	/**
	 * Dependencies
	 * @author Nate Ferrero
	 */
	var path = require('path');

	/**
	 * Route Method
	 * 
	 * @param Root Directory (appends '/lhtml' if needed)
	 * @param Search (array of segments or string)
	 * @param Scope
	 * @param Callback
	 * 
	 * @author Nate Ferrero
	 */
	lhtml.route = function(root, search, scope, callback) {

		/**
		 * Ensure in LHTML directory
		 * @author Nate Ferrero
		 */
		if(path.basename(root) !== 'lhtml')
			root += '/lhtml';

		/**
		 * Ensure search is array
		 * @author Nate Ferrero
		 */
		if(!search.join)
			search = search.split('/');

		/**
		 * Assemble Paths
		 * @author Nate Ferrero
		 */
		var paths = [];
		while(search.length) {
			while(search[search.length - 1] === '')
				search.pop();
			if(search.length) {
				paths.push(root + '/' + search.join('/') + '/index.lhtml');
				paths.push(root + '/' + search.join('/') + '.lhtml');
				search.pop();
			}
		}
		paths.push(root + '/index.lhtml');

		/**
		 * Check for LHTML files and render if matched
		 * @todo - Convert to async?
		 * @author Nate Ferrero
		 */
		var matched = false;
		while(paths.length) {
			var file = paths.shift();
			if(path.existsSync(file)) {
				lhtml.render(file, scope, callback);
				return true;
			}
		}

		/**
		 * Return false if no match
		 * @author Nate Ferrero
		 */
		return false;
	}
}