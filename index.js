/**
 * LHTML Module - Include Features
 * @author Nate Ferrero
 */
['route', 'render', 'parse'].forEach(
	function(feature) {
		require('./' + feature + '.js')(module.exports);
	}
);