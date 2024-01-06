/** @jsx $mol_jsx */
namespace $ {
	
	export function $hyoo_crus_vary_cast_bin( vary: $hyoo_crus_vary_type ) {
		return vary === null || vary === '' ? null : $hyoo_crus_vary_encode( vary ).bin
	}
	
	export function $hyoo_crus_vary_cast_bool( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => Boolean( vary?.length ),
			bool: vary => vary,
			int: vary => Boolean( vary ),
			real: vary => Boolean( vary ),
			ref: vary => Boolean( vary.description ),
			
			str: vary => Boolean( vary ),
			time: vary => Boolean( vary.valueOf() ),
			json: vary => Boolean( Reflect.ownKeys( vary ).length ),
			jsan: vary => Boolean( vary.length ),
			xml: vary => Boolean( vary.attributes.length + vary.childNodes.length ),
			tree: vary => Boolean( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_int( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => vary ? BigInt( vary.length ) : 0n,
			bool: vary => BigInt( vary ),
			int: vary => vary,
			real: vary => Number.isFinite( vary ) ? BigInt( Math.trunc( vary ) ) : 0n,
			ref: vary => 0n,//$mol_base64_ae_decode( vary.description!.slice( 0, 16 ) ) + ( BigInt( vary.land() ) << 64n ) + ( BigInt( vary.head() ) << 96n ),
			
			str: vary => {
				try {
					return BigInt( vary )
				} catch {
					return 0n
				}
			},
			
			time: vary => BigInt( vary.valueOf() ),
			json: vary => BigInt( Reflect.ownKeys( vary ).length ),
			jsan: vary => BigInt( vary.length ),
			xml: vary => BigInt( vary.attributes.length + vary.childNodes.length ),
			
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
			
			bin: vary => vary?.length ?? Number.NaN,
			bool: vary => Number( vary ),
			int: vary => Number( vary ),
			real: vary => vary,
			ref: vary => Number.NaN,
			
			str: vary => vary ? Number( vary ) : Number.NaN,
			time: vary => vary.valueOf(),
			json: vary => Reflect.ownKeys( vary ).length,
			jsan: vary => vary.length,
			xml: vary => Number( vary.attributes.length + vary.childNodes.length ),
			tree: vary => Number( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_ref( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => Symbol.for( vary ? $mol_base64_ae_encode( vary ) : '' ),
			bool: vary => Symbol.for( '' ),
			int: vary => Symbol.for( '' ),
			real: vary => Symbol.for( '' ),
			ref: vary => vary,
			
			str: vary => Symbol.for( vary ),
			time: vary => Symbol.for( '' ),
			json: vary => Symbol.for( '' ),
			jsan: vary => Symbol.for( '' ),
			xml: vary => Symbol.for( '' ),
			tree: vary => Symbol.for( vary.type ),
			
		})
	}

	export function $hyoo_crus_vary_cast_str( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => vary ? [ ... vary ].map( n => n.toString(16).padStart( 2, '0' ) ).join( '' ) : '',
			bool: vary => String( vary ),
			int: vary => String( vary ),
			real: vary => String( vary ),
			ref: vary => vary.description!,
			
			str: vary => vary,
			time: vary => String( vary ),
			json: vary => JSON.stringify( vary ),
			jsan: vary => JSON.stringify( vary ),
			xml: vary => $mol_dom_serialize( vary ),
			tree: vary => String( vary ),
			
		})
	}

	export function $hyoo_crus_vary_cast_time( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => new $mol_time_moment( vary ? $mol_charset_decode( vary ) : 0 ),
			bool: vary => new $mol_time_moment( 0 ),
			int: vary => new $mol_time_moment( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real: vary => new $mol_time_moment( vary ),
			ref: vary => new $mol_time_moment( 0 ),
			
			str: vary => new $mol_time_moment( vary ),
			time: vary => vary,
			json: vary => new $mol_time_moment( vary as any ),
			jsan: vary => new $mol_time_moment( 0 ),
			xml: vary => new $mol_time_moment( 0 ),
			tree: vary => new $mol_time_moment( 0 ),
			
		})
	}

	export function $hyoo_crus_vary_cast_json( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => vary ? { val: [ ... vary ] } : {},
			bool: vary => vary ? { val: true } : {},
			int: vary => { int: Number( vary ) },
			real: vary => { real: vary },
			ref: vary => { ref: vary.description! },
			
			str: vary => JSON.parse( vary ) ?? {},
			time: vary => ({ ... vary }),
			json: vary => vary,
			jsan: vary => vary[0] ?? {},
			xml: vary => { xml: $mol_dom_serialize( vary ) },
			tree: vary => { tree: vary.toString() },
			
		})
	}

	export function $hyoo_crus_vary_cast_jsan( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => vary ? [ ... vary ] : [],
			bool: vary => [ vary ],
			int: vary => [ vary.toString() ],
			real: vary => [ vary ],
			ref: vary => [ vary.description! ],
			
			str: vary => [].concat( JSON.parse( vary ) ),
			time: vary => [ vary.toJSON() ],
			json: vary => [ vary ],
			jsan: vary => vary,
			xml: vary => [ $mol_dom_serialize( vary ) ],
			tree: vary => [ vary.toString() ],
			
		})
	}

	export function $hyoo_crus_vary_cast_xml( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => <body>{ vary && $mol_base64_ae_encode( vary ) }</body>,
			bool: vary => <body>{ vary }</body>,
			int: vary => <body>{ vary }</body>,
			real: vary => <body>{ vary }</body>,
			ref: vary => <body>{ vary.description }</body>,
			
			str: vary => $mol_dom_parse( vary, 'application/xhtml+xml' ).documentElement,
			time: vary => <body>{ vary }</body>,
			json: vary => <body>{ JSON.stringify( vary ) }</body>,
			jsan: vary => <body>{ JSON.stringify( vary ) }</body>,
			xml: vary => vary,
			tree: vary => <body>{ vary }</body>,
			
		})
	}

	export function $hyoo_crus_vary_cast_tree( vary: $hyoo_crus_vary_type ) {
		return $hyoo_crus_vary_switch( vary, {
			
			bin: vary => vary ? $mol_tree2_bin_from_bytes( vary ) : $mol_tree2.list([]),
			bool: vary => $mol_tree2.struct( vary.toString() ),
			int: vary => $mol_tree2.struct( vary.toString() ),
			real: vary => $mol_tree2.struct( vary.toString() ),
			ref: vary => $mol_tree2.struct( vary.description! ),
			
			str: vary => $$.$mol_tree2_from_string( vary ),
			time: vary => $mol_tree2.struct( vary.toString() ),
			json: vary => $$.$mol_tree2_from_json( vary ),
			jsan: vary => $$.$mol_tree2_from_json( vary ),
			xml: vary => $$.$mol_tree2_xml_from_dom( vary ),
			tree: vary => vary,
			
		})
	}

	export const $hyoo_crus_vary_cast_funcs = {
			
		bin: $hyoo_crus_vary_cast_bin,
		bool: $hyoo_crus_vary_cast_bool,
		int: $hyoo_crus_vary_cast_int,
		real: $hyoo_crus_vary_cast_real,
		ref: $hyoo_crus_vary_cast_ref,
		
		str: $hyoo_crus_vary_cast_str,
		time: $hyoo_crus_vary_cast_time,
		json: $hyoo_crus_vary_cast_json,
		jsan: $hyoo_crus_vary_cast_jsan,
		xml: $hyoo_crus_vary_cast_xml,
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
