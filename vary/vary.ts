namespace $ {
	
	type json = null | boolean | number | string | { [ key in string ]: json } | readonly json[]
	/** Supported primitive types. */
	export type $hyoo_crus_vary_type =
	| Uint8Array | bigint | $hyoo_crus_ref
	| $mol_time_moment | $mol_time_duration | $mol_time_interval
	| $mol_tree2 | json | Node
	
	export let $hyoo_crus_vary_mapping = {
		
		nil:   null,
		bin:   Uint8Array,
		bool:  Boolean,
		int:   BigInt,
		real:  Number,
		ref:   Symbol,
		
		str:   String,
		time:  $mol_time_moment,
		dur:   $mol_time_duration,
		range: $mol_time_interval,
		json:  Object,
		jsan:  Array,
		dom:   $mol_dom_context.Element,
		tree:  $mol_tree2,
		
	}
	
	export type $hyoo_crus_vary_classes = typeof $hyoo_crus_vary_mapping[ keyof typeof $hyoo_crus_vary_mapping ]
	
	/** Universal binary package which contains some TIP and bin */
	export type $hyoo_crus_vary_pack = {
		tip: keyof typeof $hyoo_crus_vary_tip,
		bin: Uint8Array,
	}
	
	/** Hint how to interpret Data: nil, bin, bool, int, real, ref, str, time, dur, range, json, jsan, dom, tree */
	export enum $hyoo_crus_vary_tip {
		
		/** 0. No Data */
		nil = 0b00000, // 0
		/** 0. Binary */
		bin = 0b00001,
		/** 1b * 32 * 8. Boolean */
		bool = 0b00010,
		/** 8B * 4. int64 */
		int = 0b00011,
		/** 8B * 4. float64 */
		real = 0b00100,
		/** 12B + 6B = 18B. Reference to Node/Land/Lord. */
		ref   = 0b00101,

		/** String */
		str = 0b10000,
		/** iso8601 moment*/
		time = 0b10001,
		/** iso8601 duration */
		dur = 0b10010,
		/** iso8601 interval */
		range = 0b10011,
		/** Plain Old JS Object. */
		json = 0b10100, // json object
		/** Plain Old JS Array. */
		jsan = 0b10101,
		/** Document Object Model (xml, xhtml etc). */
		dom = 0b10110,
		/** Abstract Syntax Tree. */
		tree  = 0b10111,
	}
	
	export function $hyoo_crus_vary_switch< Ways extends {
			
		nil:   ( vary: null )=> any,
		bin:   ( vary: Uint8Array )=> any,
		bool:  ( vary: boolean )=> any,
		int:   ( vary: bigint )=> any,
		real:  ( vary: number )=> any,
		ref:   ( vary: $hyoo_crus_ref )=> any,
		
		str:   ( vary: string )=> any,
		time:  ( vary: $mol_time_moment )=> any,
		dur:   ( vary: $mol_time_duration )=> any,
		range: ( vary: $mol_time_interval )=> any,
		json:  ( vary: {} )=> any,
		jsan:  ( vary: any[] )=> any,
		dom:   ( vary: Element )=> any,
		tree:  ( vary: $mol_tree2 )=> any,
		
	} >(
		vary: $hyoo_crus_vary_type,
		ways: Ways,
	): $mol_type_result< Ways[ keyof Ways ] > {
		
		if( vary === null ) return ways.nil( vary )
			
		switch( typeof vary ) {
			case "boolean": return ways.bool( vary )
			case "bigint": return ways.int( vary )
			case "number": return ways.real( vary )
			case "string": return ways.str( vary )
			case 'symbol': return ways.ref( vary )
		}
		
		switch( Reflect.getPrototypeOf( vary ) ) {
			case Object.prototype: return ways.json( vary )
			case Array.prototype: return ways.jsan( vary as any[] )
			case Uint8Array.prototype: return ways.bin( vary as Uint8Array )
			case $mol_time_moment.prototype: return ways.time( vary as $mol_time_moment )
			case $mol_time_duration.prototype: return ways.dur( vary as $mol_time_duration )
			case $mol_time_interval.prototype: return ways.range( vary as $mol_time_interval )
			case $mol_tree2.prototype: return ways.tree( vary as $mol_tree2 )
		}
		
		if( vary instanceof $mol_dom_context.Element ) return ways.dom( vary )
		
		return $mol_fail( new TypeError( `Unsupported vary type` ) )
	}
	
	export function $hyoo_crus_vary_encode( vary: $hyoo_crus_vary_type ): $hyoo_crus_vary_pack {
		return $hyoo_crus_vary_switch( vary, {
			
			nil:   vary => ({ tip: 'nil' as const, bin: new Uint8Array([]) }),
			bin:   vary => ({ tip: 'bin' as const, bin: vary }),
			bool:  vary => ({ tip: 'bool' as const, bin: new Uint8Array([ Number( vary ) ]) }),
			int:   vary => ({ tip: 'int' as const, bin: new Uint8Array( new BigInt64Array([ vary as bigint ]).buffer ) }),
			real:  vary => ({ tip: 'real' as const, bin: new Uint8Array( new Float64Array([ vary as number ]).buffer ) }),
			ref:   vary => ({ tip: 'ref' as const, bin: $hyoo_crus_ref_encode( vary ) }),
			
			str:   vary => ({ tip: 'str' as const, bin: $mol_charset_encode( vary as string ) }),
			time:  vary => ({ tip: 'time' as const, bin: $mol_charset_encode( String( vary ) ) }),
			dur:   vary => ({ tip: 'dur' as const, bin: $mol_charset_encode( String( vary ) ) }),
			range: vary => ({ tip: 'range' as const, bin: $mol_charset_encode( String( vary ) ) }),
			json:  vary => ({ tip: 'json' as const, bin: $mol_charset_encode( JSON.stringify( vary ) ) }),
			jsan:  vary => ({ tip: 'jsan' as const, bin: $mol_charset_encode( JSON.stringify( vary ) ) }),
			dom:   vary => ({ tip: 'dom' as const, bin: $mol_charset_encode( $mol_dom_serialize( vary as Node ) ) }),
			tree:  vary => ({ tip: 'tree' as const, bin: $mol_charset_encode( String( vary ) ) }),
			
		} )
	}
	
	export function $hyoo_crus_vary_decode( { tip, bin }: $hyoo_crus_vary_pack ): $hyoo_crus_vary_type {
		switch( tip ) {
			
			case 'nil':   return null
			case 'bin':   return bin
			case 'bool':  return Boolean( bin[0] )
			case 'int':   return new BigInt64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'real':  return new Float64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'ref':   return $hyoo_crus_ref_decode( bin )
			
			case 'str':   return $mol_charset_decode( bin )
			case 'time':  return new $mol_time_moment( $mol_charset_decode( bin ) )
			case 'dur':   return new $mol_time_duration( $mol_charset_decode( bin ) )
			case 'range': return new $mol_time_interval( $mol_charset_decode( bin ) )
			case 'json':  return JSON.parse( $mol_charset_decode( bin ) )
			case 'jsan':  return JSON.parse( $mol_charset_decode( bin ) )
			case 'dom':   return $mol_dom_parse( $mol_charset_decode( bin ) ).documentElement
			case 'tree':  return $$.$mol_tree2_from_string( $mol_charset_decode( bin ) )
			
		}
	}
	
}
