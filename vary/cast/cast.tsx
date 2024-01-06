/** @jsx $mol_jsx */
namespace $ {
	
	export function $hyoo_crus_vary_cast_bin( vary: $hyoo_crus_vary_type ) {
		return vary === null || vary === '' ? null : $hyoo_crus_vary_encode( vary ).bin
	}
	
	export function $hyoo_crus_vary_cast_bool( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => Boolean( vary.length ),
			bool:  vary => vary,
			int:   vary => Boolean( vary ),
			real:  vary => Boolean( vary ),
			ref:   vary => Boolean( vary.description ),
			
			str:   vary => Boolean( vary ),
			time:  vary => Boolean( vary.valueOf() ),
			dur:   vary => Boolean( vary.valueOf() ),
			range: vary => Boolean( vary.duration.valueOf() ),
			json:  vary => Boolean( Reflect.ownKeys( vary ).length ),
			jsan:  vary => Boolean( vary.length ),
			dom:   vary => Boolean( vary.attributes.length + vary.childNodes.length ),
			tree:  vary => Boolean( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_int( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil: vary => null,
			bin: vary => BigInt( vary.length ),
			bool: vary => BigInt( vary ),
			int: vary => vary,
			real: vary => Number.isFinite( vary ) ? BigInt( Math.trunc( vary ) ) : 0n,
			ref: vary => null,//$mol_base64_ae_decode( vary.description!.slice( 0, 16 ) ) + ( BigInt( vary.land() ) << 64n ) + ( BigInt( vary.head() ) << 96n ),
			
			str: vary => {
				try {
					return BigInt( vary )
				} catch {
					return null
				}
			},
			
			time: vary => BigInt( vary.valueOf() ),
			dur: vary => BigInt( vary.valueOf() ),
			range: vary => BigInt( vary.duration.valueOf() ),
			
			json: vary => BigInt( Reflect.ownKeys( vary ).length ),
			jsan: vary => BigInt( vary.length ),
			dom: vary => BigInt( vary.attributes.length + vary.childNodes.length ),
			
			tree: vary => {
				try {
					return BigInt( vary.value )
				} catch {
					return BigInt( vary.kids.length )
				}
			},
			
			
		})
	}

	export function $hyoo_crus_vary_cast_real( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => vary.length,
			bool:  vary => Number( vary ),
			int:   vary => Number( vary ),
			real:  vary => vary,
			ref:   vary => null,
			
			str:   vary => vary ? Number( vary ) : null,
			time:  vary => vary.valueOf(),
			dur:   vary => vary.valueOf(),
			range: vary => vary.duration.valueOf(),
			json:  vary => Reflect.ownKeys( vary ).length,
			jsan:  vary => vary.length,
			dom:   vary => Number( vary.attributes.length + vary.childNodes.length ),
			tree:  vary => Number( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_ref( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => ( !vary.length || vary.length % 6 ) ? null : Symbol.for( $mol_base64_ae_encode( vary ) ),
			bool:  vary => null,
			int:   vary => null,
			real:  vary => null,
			ref:   vary => vary,
			
			str:   vary => ( !vary || vary.length % 8 ) ? null :  Symbol.for( vary ),
			time:  vary => null,
			dur:   vary => null,
			range: vary => null,
			json:  vary => null,
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => ( !vary.type || vary.type.length % 8 ) ? null :  Symbol.for( vary.type ),
			
		})
	}

	export function $hyoo_crus_vary_cast_str( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => [ ... vary ].map( n => n.toString(16).padStart( 2, '0' ) ).join( '' ),
			bool:  vary => String( vary ),
			int:   vary => String( vary ),
			real:  vary => String( vary ),
			ref:   vary => vary.description!,
			
			str:   vary => vary,
			time:  vary => String( vary ),
			dur:   vary => String( vary ),
			range: vary => String( vary ),
			json:  vary => JSON.stringify( vary ),
			jsan:  vary => JSON.stringify( vary ),
			dom:   vary => $mol_dom_serialize( vary ),
			tree:  vary => String( vary ),
			
		})
	}

	export function $hyoo_crus_vary_cast_time( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => new $mol_time_moment( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real:  vary => new $mol_time_moment( vary ),
			ref:   vary => null,
			
			str:   vary => new $mol_time_moment( vary ),
			time:  vary => vary,
			dur:   vary => null,
			range: vary => null,
			json:  vary => new $mol_time_moment( vary as any ),
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_dur( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => new $mol_time_duration( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real:  vary => new $mol_time_duration( vary ),
			ref:   vary => null,
			
			str:   vary => new $mol_time_duration( vary ),
			time:  vary => vary,
			dur:   vary => null,
			range: vary => null,
			json:  vary => new $mol_time_duration( vary as any ),
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_range( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => null,
			real:  vary => null,
			ref:   vary => null,
			
			str:   vary => new $mol_time_interval( vary ),
			time:  vary => new $mol_time_interval({ start: vary, duration: 0 }),
			dur:   vary => null,
			range: vary => vary,
			json:  vary => new $mol_time_moment( vary as any ),
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_json( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => { bin: [ ... vary ] },
			bool:  vary => { bool: vary },
			int:   vary => { int: Number( vary ) },
			real:  vary => { real: vary },
			ref:   vary => { ref: vary.description! },
			
			str:   vary => Object( JSON.parse( vary ) ),
			time:  vary => ({ ... vary }),
			dur:   vary => ({ ... vary }),
			range: vary => ({ ... vary }),
			json:  vary => vary,
			jsan:  vary => Object( vary[0] ),
			dom:   vary => { dom: $mol_dom_serialize( vary ) },
			tree:  vary => { tree: vary.toString() },
			
		})
	}

	export function $hyoo_crus_vary_cast_jsan( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => [ ... vary ],
			bool:  vary => [ vary ],
			int:   vary => [ vary.toString() ],
			real:  vary => [ vary ],
			ref:   vary => [ vary.description! ],
			
			str:   vary => [].concat( JSON.parse( vary ) ),
			time:  vary => [ vary.toJSON() ],
			dur:   vary => [ vary.toJSON() ],
			range: vary => [ vary.toJSON() ],
			json:  vary => [ vary ],
			jsan:  vary => vary,
			dom:   vary => [ $mol_dom_serialize( vary ) ],
			tree:  vary => [ vary.toString() ],
			
		})
	}

	export function $hyoo_crus_vary_cast_dom( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => <body>{ vary && $mol_base64_ae_encode( vary ) }</body>,
			bool:  vary => <body>{ vary }</body>,
			int:   vary => <body>{ vary }</body>,
			real:  vary => <body>{ vary }</body>,
			ref:   vary => <body>{ vary.description }</body>,
			
			str:   vary => $mol_dom_parse( vary, 'application/xhtml+xml' ).documentElement,
			time:  vary => <body>{ vary }</body>,
			dur:   vary => <body>{ vary }</body>,
			range: vary => <body>{ vary }</body>,
			json:  vary => <body>{ JSON.stringify( vary ) }</body>,
			jsan:  vary => <body>{ JSON.stringify( vary ) }</body>,
			dom:   vary => vary,
			tree:  vary => <body>{ vary }</body>,
			
		})
	}

	export function $hyoo_crus_vary_cast_tree( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => $mol_tree2_bin_from_bytes( vary ),
			bool:  vary => $mol_tree2.struct( vary.toString() ),
			int:   vary => $mol_tree2.struct( vary.toString() ),
			real:  vary => $mol_tree2.struct( vary.toString() ),
			ref:   vary => $mol_tree2.struct( vary.description! ),
			
			str:   vary => $$.$mol_tree2_from_string( vary ),
			time:  vary => $mol_tree2.struct( vary.toString() ),
			dur:   vary => $mol_tree2.struct( vary.toString() ),
			range: vary => $mol_tree2.struct( vary.toString() ),
			json:  vary => $$.$mol_tree2_from_json( vary ),
			jsan:  vary => $$.$mol_tree2_from_json( vary ),
			dom:   vary => $$.$mol_tree2_xml_from_dom( vary ),
			tree:  vary => vary,
			
		})
	}

	export const $hyoo_crus_vary_cast_funcs = {
			
		nil: ()=> null,
		bin: $hyoo_crus_vary_cast_bin,
		bool: $hyoo_crus_vary_cast_bool,
		int: $hyoo_crus_vary_cast_int,
		real: $hyoo_crus_vary_cast_real,
		ref: $hyoo_crus_vary_cast_ref,
		
		str: $hyoo_crus_vary_cast_str,
		time: $hyoo_crus_vary_cast_time,
		dur: $hyoo_crus_vary_cast_dur,
		range: $hyoo_crus_vary_cast_range,
		json: $hyoo_crus_vary_cast_json,
		jsan: $hyoo_crus_vary_cast_jsan,
		dom: $hyoo_crus_vary_cast_dom,
		tree: $hyoo_crus_vary_cast_tree,
		
	} as const
	
	export function $hyoo_crus_vary_cast<
		Tip extends keyof typeof $hyoo_crus_vary_tip
	>(
		tip: Tip,
		vary: $hyoo_crus_vary_type,
	) {
		return $hyoo_crus_vary_cast_funcs[ tip ]( vary )
	}
	
}
