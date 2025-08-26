/** @jsx $mol_jsx */
namespace $ {
	
	export function $hyoo_crus_vary_cast_bin( vary: $hyoo_crus_vary_type ): Uint8Array< ArrayBuffer > | null {
		return vary === null || vary === '' ? null : $hyoo_crus_vary_encode( vary ).bin
	}
	
	export function $hyoo_crus_vary_cast_bool( vary: $hyoo_crus_vary_type ): boolean | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => Boolean( vary.length ),
			bool:  vary => vary,
			int:   vary => Boolean( vary ),
			real:  vary => Boolean( vary ),
			ints:  vary => Boolean( vary.length ),
			reals: vary => Boolean( vary.length ),
			link:  vary => vary.str !== '',
			
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

	export function $hyoo_crus_vary_cast_int( vary: $hyoo_crus_vary_type ): bigint | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => BigInt( vary.length ),
			bool:  vary => BigInt( vary ),
			int:   vary => vary,
			real:  vary => Number.isFinite( vary ) ? BigInt( Math.trunc( vary ) ) : null,
			ints:  vary => BigInt( vary.length ),
			reals: vary => BigInt( vary.length ),
			link:  vary => null,//$mol_base64_ae_decode( vary.str.slice( 0, 16 ) ) + ( BigInt( vary.land() ) << 64n ) + ( BigInt( vary.head() ) << 96n ),
			
			str:   vary => {
				try {
					return vary ? BigInt( vary ) : null
				} catch {
					return null
				}
			},
			
			time:  vary => BigInt( vary.valueOf() ),
			dur:   vary => BigInt( vary.valueOf() ),
			range: vary => BigInt( vary.duration.valueOf() ),
			
			json:  vary => BigInt( Reflect.ownKeys( vary ).length ),
			jsan:  vary => BigInt( vary.length ),
			dom:   vary => BigInt( vary.attributes.length + vary.childNodes.length ),
			
			tree:  vary => {
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
			
			nil:   vary => null,
			bin:   vary => vary.length,
			bool:  vary => Number( vary ),
			int:   vary => Number( vary ),
			real:  vary => vary,
			ints:  vary => vary.length,
			reals: vary => vary.length,
			link:  vary => null,
			
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

	export function $hyoo_crus_vary_cast_ints( vary: $hyoo_crus_vary_type ): BigInt64Array | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => new BigInt64Array( [ ... vary ].map( BigInt ) ),
			bool:  vary => vary ? new BigInt64Array([ 1n ]) : null,
			int:   vary => new BigInt64Array([ vary ]),
			real:  vary => Number.isFinite( vary ) ? new BigInt64Array([ BigInt( vary ) ]) : null,
			ints:  vary => vary,
			reals: vary => new BigInt64Array( [ ... vary ].map( BigInt ) ),
			link:  vary => null,
			
			str:   vary => {
				if( !vary ) return null
				return new BigInt64Array( vary.split( ',' ).map( v => BigInt(v) || 0n ) )
			},
			time:  vary => new BigInt64Array([ BigInt( vary.valueOf() ) ]),
			dur:   vary => new BigInt64Array([ BigInt( vary.valueOf() ) ]),
			range: vary => null,
			json:  vary => null,
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_reals( vary: $hyoo_crus_vary_type ): Float64Array | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => new Float64Array( [ ... vary ] ),
			bool:  vary => vary ? new Float64Array([ 1 ]) : null,
			int:   vary => new Float64Array([ Number( vary ) ]),
			real:  vary => ( vary && Number.isFinite( vary ) ) ? new Float64Array([ vary ]) : null,
			ints:  vary => new Float64Array( [ ... vary ].map( Number ) ),
			reals: vary => vary,
			link:  vary => null,
			
			str:   vary => {
				if( !vary ) return null
				return new Float64Array( vary.split( ',' ).map( v => Number(v) || 0 ) )
			},
			time:  vary => new Float64Array([ vary.valueOf() ]),
			dur:   vary => new Float64Array([ vary.valueOf() ]),
			range: vary => null,
			json:  vary => null,
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_link( vary: $hyoo_crus_vary_type ): $hyoo_crus_link | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => ( !vary.length || vary.length % 6 ) ? null : $hyoo_crus_link.from_bin( vary ),
			bool:  vary => null,
			int:   vary => null,
			real:  vary => null,
			ints:  vary => null,
			reals: vary => null,
			link:  vary => vary,
			
			str:   vary => {
				try {
					return new $hyoo_crus_link( vary )
				} catch {
					return null
				}
			},
			time:  vary => null,
			dur:   vary => null,
			range: vary => null,
			json:  vary => null,
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => {
				try {
					return new $hyoo_crus_link( vary.type )
				} catch {
					return null
				}
			},
			
		})
	}

	export function $hyoo_crus_vary_cast_str( vary: $hyoo_crus_vary_type ): string | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => [ ... vary ].map( n => n.toString(16).padStart( 2, '0' ) ).join( '' ),
			bool:  vary => String( vary ),
			int:   vary => String( vary ),
			real:  vary => String( vary ),
			ints:  vary => vary.join(','),
			reals: vary => vary.join(','),
			link:  vary => vary.str,
			
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

	export function $hyoo_crus_vary_cast_time( vary: $hyoo_crus_vary_type ): $mol_time_moment | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => new $mol_time_moment( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real:  vary => {
				try {
					return new $mol_time_moment( vary )
				} catch {
					return null
				}
			},
			ints:  vary => null,
			reals: vary => null,
			link:  vary => null,
			
			str:   vary => {
				try {
					return vary ? new $mol_time_moment( vary ) : null
				} catch {
					return null
				}
			},
			time:  vary => vary,
			dur:   vary => null,
			range: vary => null,
			json:  vary => {
				try {
					return new $mol_time_moment( vary )
				} catch {
					return null
				}
			},
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_dur( vary: $hyoo_crus_vary_type ): $mol_time_duration | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => new $mol_time_duration( Number( vary & 0xFFFFFFFFFFFFn ) ),
			real:  vary => {
				try {
					return new $mol_time_duration( vary )
				} catch {
					return null
				}
			},
			ints:  vary => null,
			reals: vary => null,
			link:  vary => null,
			
			str:   vary => {
				try {
					return new $mol_time_duration( vary )
				} catch {
					return null
				}
			},
			time:  vary => null,
			dur:   vary => vary,
			range: vary => null,
			json:  vary => new $mol_time_duration( vary as any ),
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_range( vary: $hyoo_crus_vary_type ): $mol_time_interval | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => null,
			real:  vary => null,
			ints:  vary => null,
			reals: vary => null,
			link:  vary => null,
			
			str:   vary => {
				try {
					return vary ? new $mol_time_interval( vary ) : null
				} catch {
					return null
				}
			},
			time:  vary => new $mol_time_interval({ start: vary, duration: 0 }),
			dur:   vary => null,
			range: vary => vary,
			json:  vary => {
				try {
					return new $mol_time_interval( vary )
				} catch {
					return null
				}
			},
			jsan:  vary => null,
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_json( vary: $hyoo_crus_vary_type ): {} | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => null,
			bool:  vary => null,
			int:   vary => null,
			real:  vary => null,
			ints:  vary => null,
			reals: vary => null,
			link:  vary => null,
			
			str:   vary => {
				if( !vary ) return null
				try {
					const res = JSON.parse( vary )
					if( typeof res === 'object' ) return res
					return null
				} catch {
					return null
				}
			},
			time:  vary => ({ ... vary }),
			dur:   vary => ({ ... vary }),
			range: vary => ({ ... vary }),
			json:  vary => vary,
			jsan:  vary => Object( vary[0] ),
			dom:   vary => null,
			tree:  vary => null,
			
		})
	}

	export function $hyoo_crus_vary_cast_jsan( vary: $hyoo_crus_vary_type ): any[] | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => [ ... vary ],
			bool:  vary => [ vary ],
			int:   vary => [ vary.toString() ],
			real:  vary => Number.isFinite( vary ) ? [ vary ] : null,
			ints:  vary => [ ... vary ].map( v => Number( v ) ),
			reals: vary => [ ... vary ],
			link:  vary => [ vary.str ],
			
			str:   vary => {
				if( !vary ) return null
				try {
					return [].concat( JSON.parse( vary ) )
				} catch {
					return [ vary ]
				}
			},
			time:  vary => [ vary.toJSON() ],
			dur:   vary => [ vary.toJSON() ],
			range: vary => [ vary.toJSON() ],
			json:  vary => [ vary ],
			jsan:  vary => vary,
			dom:   vary => [ $mol_dom_serialize( vary ) ],
			tree:  vary => [ vary.toString() ],
			
		})
	}

	export function $hyoo_crus_vary_cast_dom( vary: $hyoo_crus_vary_type ): Element | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => <body>{ vary && $mol_base64_ae_encode( vary ) }</body>,
			bool:  vary => <body>{ vary }</body>,
			int:   vary => <body>{ vary }</body>,
			real:  vary => <body>{ vary }</body>,
			ints:  vary => <body>{ vary.join(',') }</body>,
			reals: vary => <body>{ vary.join(',') }</body>,
			link:  vary => <body>{ vary.str }</body>,
			
			str:   vary => {
				if( !vary ) return null
				try {
					return vary ? $mol_dom_parse( vary, 'application/xhtml+xml' ).documentElement : null
				} catch {
					return <body>{ vary }</body>
				}
			},
			time:  vary => <body>{ vary }</body>,
			dur:   vary => <body>{ vary }</body>,
			range: vary => <body>{ vary }</body>,
			json:  vary => <body>{ JSON.stringify( vary ) }</body>,
			jsan:  vary => <body>{ JSON.stringify( vary ) }</body>,
			dom:   vary => vary,
			tree:  vary => <body>{ vary }</body>,
			
		})
	}

	export function $hyoo_crus_vary_cast_tree( vary: $hyoo_crus_vary_type ): $mol_tree2 | null {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => null,
			bin:   vary => $mol_tree2_bin_from_bytes( vary ),
			bool:  vary => $mol_tree2.struct( vary.toString() ),
			int:   vary => $mol_tree2.struct( vary.toString() ),
			real:  vary => $mol_tree2.struct( vary.toString() ),
			ints:  vary => $mol_tree2.list( [ ... vary ].map( v => $mol_tree2.struct( v.toString() ) ) ),
			reals: vary => $mol_tree2.list( [ ... vary ].map( v => $mol_tree2.struct( v.toString() ) ) ),
			link:  vary => $mol_tree2.struct( vary.str ),
			
			str:   vary => {
				if( !vary ) return null
				try {
					return $$.$mol_tree2_from_string( vary )
				} catch {
					return $$.$mol_tree2.data( vary )
				}
			},
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
		ints: $hyoo_crus_vary_cast_ints,
		reals: $hyoo_crus_vary_cast_reals,
		link: $hyoo_crus_vary_cast_link,
		
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
