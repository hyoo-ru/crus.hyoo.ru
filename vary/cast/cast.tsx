/** @jsx $mol_jsx */
namespace $ {
	
	export function $hyoo_crus_vary_cast_blob( vary: $hyoo_crus_vary_type ): ArrayLike< number | bigint > | null {
		return ArrayBuffer.isView( vary ) ? vary : null
	}
	
	export function $hyoo_crus_vary_cast_bool( vary: $hyoo_crus_vary_type ): boolean | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => Boolean( vary.byteLength ),
			bool: vary => vary,
			bint: vary => Boolean( vary ),
			real: vary => Boolean( vary ),
			link: vary => vary.str !== '',
			text: vary => Boolean( vary ),
			time: vary => Boolean( vary.valueOf() ),
			dura: vary => Boolean( vary.valueOf() ),
			span: vary => Boolean( vary.duration.valueOf() ),
			dict: vary => Boolean( Reflect.ownKeys( vary ).length ),
			list: vary => Boolean( vary.length ),
			elem: vary => Boolean( vary.attributes.length + vary.childNodes.length ),
			tree: vary => Boolean( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_bint( vary: $hyoo_crus_vary_type ): bigint | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => BigInt( ( vary as any as ArrayLike< number > ).length ),
			bool: vary => BigInt( vary ),
			bint: vary => vary,
			real: vary => Number.isFinite( vary ) ? BigInt( Math.trunc( vary ) ) : null,
			link: vary => null,
			
			text: vary => {
				try {
					return vary ? BigInt( vary ) : null
				} catch {
					return null
				}
			},
			
			time: vary => BigInt( vary.valueOf() ),
			dura: vary => BigInt( vary.valueOf() ),
			span: vary => BigInt( vary.duration.valueOf() ),
			
			dict: vary => BigInt( Reflect.ownKeys( vary ).length ),
			list: vary => BigInt( vary.length ),
			elem: vary => BigInt( vary.attributes.length + vary.childNodes.length ),
			
			tree: vary => {
				try {
					return BigInt( vary.value )
				} catch {
					return BigInt( vary.kids.length )
				}
			},
			
		})
	}

	export function $hyoo_crus_vary_cast_real( vary: $hyoo_crus_vary_type ): number | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => ( vary as any as ArrayLike< number > ).length,
			bool: vary => Number( vary ),
			bint: vary => Number( vary ),
			real: vary => vary,
			link: vary => null,
			text: vary => vary ? Number( vary ) : null,
			time: vary => vary.valueOf(),
			dura: vary => vary.valueOf(),
			span: vary => vary.duration.valueOf(),
			dict: vary => Reflect.ownKeys( vary ).length,
			list: vary => vary.length,
			elem: vary => Number( vary.attributes.length + vary.childNodes.length ),
			tree: vary => Number( vary.value || vary.kids.length ),
			
		})
	}

	export function $hyoo_crus_vary_cast_link( vary: $hyoo_crus_vary_type ): $hyoo_crus_link | null {
		return vary instanceof $hyoo_crus_link ? vary : null
	}

	export function $hyoo_crus_vary_cast_text( vary: $hyoo_crus_vary_type ): string | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => $mol_base64_ae_encode( new Uint8Array( vary.buffer, vary.byteOffset, vary.byteLength ) ),
			bool: vary => String( vary ),
			bint: vary => String( vary ),
			real: vary => String( vary ),
			link: vary => vary.str,
			text: vary => vary,
			time: vary => String( vary ),
			dura: vary => String( vary ),
			span: vary => String( vary ),
			dict: vary => JSON.stringify( vary ),
			list: vary => JSON.stringify( vary ),
			elem: vary => $mol_dom_serialize( vary ),
			tree: vary => String( vary ),
			
		})
	}

	export function $hyoo_crus_vary_cast_time( vary: $hyoo_crus_vary_type ): $mol_time_moment | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => null,
			bool: vary => null,
			bint: vary => new $mol_time_moment( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real: vary => {
				try {
					return new $mol_time_moment( vary )
				} catch {
					return null
				}
			},
			link: vary => null,
			
			text: vary => {
				try {
					return vary ? new $mol_time_moment( vary ) : null
				} catch {
					return null
				}
			},
			time: vary => vary,
			dura: vary => null,
			span: vary => null,
			dict: vary => {
				try {
					return new $mol_time_moment( vary )
				} catch {
					return null
				}
			},
			list: vary => null,
			elem: vary => null,
			tree: vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_dura( vary: $hyoo_crus_vary_type ): $mol_time_duration | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => null,
			bool: vary => null,
			bint: vary => new $mol_time_duration( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real: vary => {
				try {
					return new $mol_time_duration( vary )
				} catch {
					return null
				}
			},
			link: vary => null,
			
			text: vary => {
				try {
					return new $mol_time_duration( vary )
				} catch {
					return null
				}
			},
			time: vary => null,
			dura: vary => vary,
			span: vary => null,
			dict: vary => new $mol_time_duration( vary as any ),
			list: vary => null,
			elem: vary => null,
			tree: vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_span( vary: $hyoo_crus_vary_type ): $mol_time_interval | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => null,
			bool: vary => null,
			bint: vary => null,
			real: vary => null,
			link: vary => null,
			
			text: vary => {
				try {
					return vary ? new $mol_time_interval( vary ) : null
				} catch {
					return null
				}
			},
			time: vary => new $mol_time_interval({ start: vary, duration: 0 }),
			dura: vary => null,
			span: vary => vary,
			dict: vary => {
				try {
					return new $mol_time_interval( vary )
				} catch {
					return null
				}
			},
			list: vary => null,
			elem: vary => null,
			tree: vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_dict( vary: $hyoo_crus_vary_type ): {} | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => null,
			bool: vary => null,
			bint: vary => null,
			real: vary => null,
			link: vary => null,
			
			text: vary => {
				if( !vary ) return null
				try {
					const res = JSON.parse( vary )
					if( typeof res === 'object' ) return res
					return null
				} catch {
					return null
				}
			},
			time: vary => ({ ... vary }),
			dura: vary => ({ ... vary }),
			span: vary => ({ ... vary }),
			dict: vary => vary,
			list: vary => Object( vary[0] ),
			elem: vary => null,
			tree: vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_list( vary: $hyoo_crus_vary_type ): any[] | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => [ ... ( vary as any as ArrayIterator< number > ) ],
			bool: vary => [ vary ],
			bint: vary => [ vary.toString() ],
			real: vary => Number.isFinite( vary ) ? [ vary ] : null,
			link: vary => [ vary.str ],
			
			text: vary => {
				if( !vary ) return null
				try {
					return [].concat( JSON.parse( vary ) )
				} catch {
					return [ vary ]
				}
			},
			time: vary => [ vary.toJSON() ],
			dura: vary => [ vary.toJSON() ],
			span: vary => [ vary.toJSON() ],
			dict: vary => [ vary ],
			list: vary => vary,
			elem: vary => [ $mol_dom_serialize( vary ) ],
			tree: vary => [ vary.toString() ],
			
		})
	}

	export function $hyoo_crus_vary_cast_elem( vary: $hyoo_crus_vary_type ): Element | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => <body>{ $hyoo_crus_vary_cast_text( vary as Uint8Array< ArrayBuffer > ) }</body>,
			bool: vary => <body>{ vary }</body>,
			bint: vary => <body>{ vary }</body>,
			real: vary => <body>{ vary }</body>,
			link: vary => <body>{ vary.str }</body>,
			
			text: vary => {
				if( !vary ) return null
				try {
					return vary ? $mol_dom_parse( vary, 'application/xhtml+xml' ).documentElement : null
				} catch {
					return <body>{ vary }</body>
				}
			},
			time: vary => <body>{ vary }</body>,
			dura: vary => <body>{ vary }</body>,
			span: vary => <body>{ vary }</body>,
			dict: vary => <body>{ JSON.stringify( vary ) }</body>,
			list: vary => <body>{ JSON.stringify( vary ) }</body>,
			elem: vary => vary,
			tree: vary => <body>{ vary }</body>,
			
		})
	}

	export function $hyoo_crus_vary_cast_tree( vary: $hyoo_crus_vary_type ): $mol_tree2 | null {
		return $hyoo_crus_vary_switch( vary, {
			
			none: vary => null,
			blob: vary => vary instanceof Uint8Array ? $mol_tree2_bin_from_bytes( vary ) : null,
			bool: vary => $mol_tree2.struct( vary.toString() ),
			bint: vary => $mol_tree2.struct( vary.toString() ),
			real: vary => $mol_tree2.struct( vary.toString() ),
			link: vary => $mol_tree2.struct( vary.str ),
			
			text: vary => {
				if( !vary ) return null
				try {
					return $$.$mol_tree2_from_string( vary )
				} catch {
					return $$.$mol_tree2.data( vary )
				}
			},
			time: vary => $mol_tree2.struct( vary.toString() ),
			dura: vary => $mol_tree2.struct( vary.toString() ),
			span: vary => $mol_tree2.struct( vary.toString() ),
			dict: vary => $$.$mol_tree2_from_json( vary ),
			list: vary => $$.$mol_tree2_from_json( vary ),
			elem: vary => $$.$mol_tree2_xml_from_dom( vary ),
			tree: vary => vary,
			
		})
	}

	export const $hyoo_crus_vary_cast_funcs = {
			
		none: ()=> null,
		blob: $hyoo_crus_vary_cast_blob,
		bool: $hyoo_crus_vary_cast_bool,
		bint: $hyoo_crus_vary_cast_bint,
		real: $hyoo_crus_vary_cast_real,
		link: $hyoo_crus_vary_cast_link,
		text: $hyoo_crus_vary_cast_text,
		time: $hyoo_crus_vary_cast_time,
		dura: $hyoo_crus_vary_cast_dura,
		span: $hyoo_crus_vary_cast_span,
		dict: $hyoo_crus_vary_cast_dict,
		list: $hyoo_crus_vary_cast_list,
		elem: $hyoo_crus_vary_cast_elem,
		tree: $hyoo_crus_vary_cast_tree,
		
	} as const
	
}
