/**
 * LHTML Module - Grammar
 * The entire syntax is defined here as what token the next char implies
 * @author Nate Ferrero
 */
module.exports = {
	
	// _
	'default' 			: {	'<' : 'tag-start' 				},
	
	// <_
	'tag-start' 		: {	' ' : '#error',
									'<' : '#error',
									'>' : '#error',
									'"' : '#error',
									"'" : '#error',
									'/' : 'tag-close',
									'*' : 'tag-open-name',
									'!' : 'tag-special'			},
	// <!_
	'tag-special'		: {	'!' : '#error',
									'd' : 'tag-doctype',
									'D' : 'tag-doctype',
									'-' : '&tag-comment',
									'*' : '&tag-contents'			},
									
	// <!-_
	'tag-comment'		: {	'extended' : {
										'-->' : 'tag-end-outside'
									}
																	},
	
	// <!d_
	'tag-doctype'		: {	'>' : 'tag-end-outside'		},
	
	// </_					
	'tag-close'			: {	' ' : '#error',
									'/' : '#error',
									'<' : '#error',
									'>' : '#error',
									'"' : '#error',
									"'" : '#error',
									'*' : '&tag-close-name'		},
	// <a_								
	'tag-open-name' 	: {	' ' : 'tag-open-body',
									'<' : '#error',
									'>' : 'tag-end-inside',
									'"' : '#error',
									"'" : '#error',
									'/' : 'tag-end-close'			},
	// </a_							
	'tag-close-name' 	: {	' ' : '#error',
									'<' : '#error',
									'>' : 'tag-end-outside',
									'"' : '#error',
									"'" : '#error',
									'/' : '#error'					},
	// <a ... _						
	'tag-open-body'		: {	' ' : '#self',
									'<' : '#error',
									'>' : 'tag-end-inside',
									'"' : '#error',
									"'" : '#error',
									'/' : 'tag-end-close',
									'*' : 'tag-attr-name'			},
	// <a ... b_						
	'tag-attr-name'		: {	' ' : '#error',
									'<' : '#error',
									'>' : '#error',
									'"' : '#error',
									"'" : '#error',
									'/' : '#error',
									'=' : 'tag-attr-equal'			},
	// <a ... b=_						
	'tag-attr-equal'	: {	'"' : 'tag-attr-quote',
									'*' : '#error'					},
	// <a ... b="_						
	'tag-attr-quote'	: {	'"' : 'tag-attr-qend',
									'*' : 'tag-attr-value'	},
	// <a ... b="c_						
	'tag-attr-value'	: {	'escape' : '\\',
									'"' : 'tag-attr-qend'			},
	// <a ... b="c"_						
	'tag-attr-qend'		: {	'*' : '&tag-open-body'			},
	
	// <a ... /_								
	'tag-end-close' 	: {	' ' : '#error',
									'<' : '#error',
									'>' : 'tag-end-outside',
									'"' : '#error',
									"'" : '#error',
									'/' : '#error'					},
	// <a ... />_ or </a>_							
	'tag-end-outside'	: {	'*' : '&default'				},
	
	// <a ... >_ or <a>_							
	'tag-end-inside'	: {	'*' : '&tag-contents',
									'<' : 'tag-start'				},
					
	// <a>_						
	'tag-contents' 		: {	'type' : 'conditional',
	
		// <script...>_
		'entries' : [
			{	'match-sequence' 	: {
						'tag-start' 		: '<',
						'tag-open-name' 	: 'script',
						'*' 				: '*', // Allow attributes
						'tag-end-inside'	: '>',
					},
					
					'token' 	: 'cdata-block',
					'end'		: '</script>'
			},
			
			// <style...>_
			{	'match-sequence' 	: {
						'tag-start' 		: '<',
						'tag-open-name' 	: 'style',
						'*' 				: '*', // Allow attributes
						'tag-end-inside'	: '>',
					},
					
					'token' 	: 'cdata-block',
					'end'		: '</style>'
			},
		
			/* For Later?
					
					'default'		: {
						'</script>'	: '!default',
						'//'		: 'cdata-line-comment',
						'/*'		: 'cdata-block-comment',
						'"' 		: 'cdata-string-double',
						"'" 		: 'cdata-string-single'
					}
			},*/
					
			// <other...>_
			{	'*' : '&default'									}
		],
	},
	
	// cdata
	'cdata-block' 		: {	'<' : 'tag-start'				}
};