namespace $ {
	
	type json = null | boolean | number | string | { [ key in string ]: json } | readonly json[]
	export type $hyoo_cras_vary_type = null | Uint8Array | bigint | $hyoo_cras_ref | $mol_time_moment | $mol_tree2 | json | Node
	
	export let $hyoo_cras_vary_mapping = {
		bin: Uint8Array,
		bool: Boolean,
		int: BigInt,
		real: Number,
		ref: $hyoo_cras_ref,
		str: String,
		time: $mol_time_moment,
		json: Object,
		xml: $mol_dom_context.Element,
		tree: $mol_tree2,
	}
	
	export type $hyoo_cras_vary_classes = typeof $hyoo_cras_vary_mapping[ keyof typeof $hyoo_cras_vary_mapping ]
	
	export type $hyoo_cras_vary_pack = {
		tip: keyof typeof $hyoo_cras_vary_tip,
		bin: Uint8Array,
	}
	
	export enum $hyoo_cras_vary_tip {
		
		bin  = 0b00000, // 0
		bool = 0b00001, // 1b * 32 * 8
		int  = 0b00010, // 8B * 4
		real = 0b00011, // 8B * 4
		ref  = 0b00100, // 12B + 6B + 6B = 24B
		
		str  = 0b10000,
		time = 0b10001, // iso8601
		json = 0b10010, // array or object only
		xml  = 0b10011, //
		tree = 0b10100,
		
	}
	
	export function $hyoo_cras_vary_switch< Ways extends {
			
		bin: ( vary: null | Uint8Array )=> any,
		bool: ( vary: boolean )=> any,
		int: ( vary: bigint )=> any,
		real: ( vary: number )=> any,
		ref: ( vary: $hyoo_cras_ref )=> any,
		
		str: ( vary: string )=> any,
		time: ( vary: $mol_time_moment )=> any,
		json: ( vary: {} | any[] )=> any,
		xml: ( vary: Element )=> any,
		tree: ( vary: $mol_tree2 )=> any,
		
	} >(
		vary: $hyoo_cras_vary_type,
		ways: Ways,
	): $mol_type_result< Ways[ keyof Ways ] > {
		
		if( vary === null ) return ways.bin( vary )
			
		switch( typeof vary ) {
			case "boolean": return ways.bool( vary )
			case "bigint": return ways.int( vary )
			case "number": return ways.real( vary )
			case "string": return ways.str( vary )
		}
		
		if( vary instanceof Uint8Array ) return ways.bin( vary )
		if( vary instanceof $mol_dom_context.Element ) return ways.xml( vary )
		if( vary instanceof $hyoo_cras_ref ) return ways.ref( vary )
		if( vary instanceof $mol_time_moment ) return ways.time( vary )
		if( vary instanceof $mol_tree2 ) return ways.tree( vary )
		
		switch( Reflect.getPrototypeOf( vary ) ) {
			case Object.prototype: return ways.json( vary )
			case Array.prototype: return ways.json( vary )
		}
		
		return $mol_fail( new TypeError( `Unsupported vary type` ) )
	}
	
	export function $hyoo_cras_vary_encode( vary: $hyoo_cras_vary_type ): $hyoo_cras_vary_pack {
		return $hyoo_cras_vary_switch( vary, {
			
			bin: vary => ({ tip: 'bin' as const, bin: vary as Uint8Array ?? new Uint8Array([]) }),
			bool: vary => ({ tip: 'bool' as const, bin: new Uint8Array([ Number( vary ) ]) }),
			int: vary => ({ tip: 'int' as const, bin: new Uint8Array( new BigInt64Array([ vary as bigint ]).buffer ) }),
			real: vary => ({ tip: 'real' as const, bin: new Uint8Array( new Float64Array([ vary as number ]).buffer ) }),
			ref: vary => ({ tip: 'ref' as const, bin: ( vary as $hyoo_cras_ref ).asArray() }),
			
			str: vary => ({ tip: 'str' as const, bin: $mol_charset_encode( vary as string ) }),
			time: vary => ({ tip: 'time' as const, bin: $mol_charset_encode( String( vary ) ) }),
			json: vary => ({ tip: 'json' as const, bin: $mol_charset_encode( JSON.stringify( vary ) ) }),
			xml: vary => ({ tip: 'xml' as const, bin: $mol_charset_encode( $mol_dom_serialize( vary as Node ) ) }),
			tree: vary => ({ tip: 'tree' as const, bin: $mol_charset_encode( String( vary ) ) }),
			
		} )
	}
	
	export function $hyoo_cras_vary_decode( { tip, bin }: $hyoo_cras_vary_pack ): $hyoo_cras_vary_type {
		switch( tip ) {
			case 'bin': return bin.byteLength ? bin : null
			case 'bool': return Boolean( bin[0] )
			case 'int': return new BigInt64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'real': return new Float64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'ref': return $hyoo_cras_ref.from( bin )
			case 'str': return $mol_charset_decode( bin )
			case 'time': return new $mol_time_moment( $mol_charset_decode( bin ) )
			case 'json': return JSON.parse( $mol_charset_decode( bin ) )
			case 'xml': return $mol_dom_parse( $mol_charset_decode( bin ) ).documentElement
			case 'tree': return $$.$mol_tree2_from_string( $mol_charset_decode( bin ) )
		}
	}
	
}
