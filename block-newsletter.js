( function( blocks, editor, element, components ) {

	const el = element.createElement;

	const { registerBlockType } = blocks;

	const { InspectorControls, withColors, PanelColorSettings, getColorClassName } = editor;

	const { Fragment } = element;

	const iconEmail = el('svg', { width: 20, height: 20 },
		el( 'path',
			{
				d: "M19.833 1.127c-0.144-0.129-0.349-0.163-0.527-0.088l-19 8c-0.192 0.081-0.314 0.272-0.306 0.48s0.144 0.389 0.342 0.455l5.658 1.886v5.64c0 0.212 0.133 0.4 0.333 0.471 0.055 0.019 0.111 0.029 0.167 0.029 0.148 0 0.291-0.066 0.388-0.185l2.763-3.401 4.497 4.441c0.095 0.094 0.221 0.144 0.351 0.144 0.042 0 0.084-0.005 0.125-0.016 0.17-0.044 0.305-0.174 0.355-0.343l5-17c0.055-0.185-0.003-0.385-0.147-0.514zM16.13 3.461l-9.724 7.48-4.488-1.496 14.212-5.984zM7 11.746l9.415-7.242-7.194 8.854c-0 0-0 0.001-0.001 0.001l-2.22 2.733v-4.346zM14.256 17.557l-3.972-3.922 8.033-9.887-4.061 13.808z"
			}
		)
	);

	const colorSamples = [
		{
			name: 'Coral',
			slug: 'coral',
			color: '#FF7F50'
		},
		{
			name: 'Lavender',
			slug: 'lavender',
			color: '#E6E6FA'
		},
		{
			name: 'White',
			slug: 'white',
			color: '#ffffff'
		}
	];


	registerBlockType( 'misha/newsletter', {
		title: 'Newsletter',
		icon: iconEmail,
		category: 'widgets',
		keywords: [ 'email', 'subscribe', 'misha' ],

		attributes: {
			formColor: {
				type: 'string',
			},
			customFormColor: {
				type: 'string',
			},
		},

		// The "edit" property must be a valid function.
		edit: withColors( 'formColor' )( function( props ) {

			var formClasses = (( props.formColor.class || '' ) + ' ' + props.className ).trim();

			var formStyles = {
				backgroundColor: props.formColor.class ? undefined : props.attributes.customFormColor,
			};

			var buttonStyles = {
				color: props.formColor.class ? undefined : props.attributes.customFormColor,
			}

			return (
				el( Fragment, {},

					el( InspectorControls, {},
						el( PanelColorSettings,
							{
								title: 'Awesome Color Options',
							 	colorSettings: [
									{
										colors: colorSamples,
										value: props.formColor.color,
		                						label: 'Form Color',
										onChange: props.setFormColor,
									}
								]
							},
						),
					),

					el( 'div', { className: formClasses, style: formStyles },
						el( 'div', { className: 'misha-subscription-block-form-wrap' },
							el( 'div', {},
								'Enter your email...'
							),
							el( 'div', { style: buttonStyles },
								'Subscribe'
							)
						)
					)
				) // end Fragment
			);
		} ),

		save: function( props ) {

			var formClass = getColorClassName( 'form-color', props.attributes.formColor );
			
			var formClasses = formClass || '';

			var formStyles = {
				backgroundColor: formClass ? undefined : props.attributes.customFormColor,
			};

			var buttonStyles = {
				color: formClass ? undefined : props.attributes.customFormColor,
			};

			return (
				el( 'div', { className: formClasses, style: formStyles },
					el( 'form', { className: 'misha-subscription-block-form-wrap' },
						el( 'input', { 'type': 'email', 'placeholder' : 'Enter your email address' } ),
						el( 'button', { style: buttonStyles }, 'Subscribe' )
					)
				)
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.element,
	window.wp.components,
);
