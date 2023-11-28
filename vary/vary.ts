namespace $ {
	
	type json = null | boolean | number | string | { [ key in string ]: json } | readonly json[]
	export type $hyoo_crowds_vary_type = null | Uint8Array | bigint | $hyoo_crowds_node_ref | $mol_time_moment | $mol_tree2 | json | Node
	
	export type $hyoo_crowds_vary_pack = {
		tip: keyof typeof $hyoo_crowds_vary_tip,
		bin: Uint8Array,
	}
	
	export enum $hyoo_crowds_vary_tip {
		
		bin  = 0b00000, // 0
		bool = 0b00001, // 1b * 32 * 8
		int  = 0b00010, // 8B * 4
		real = 0b00011, // 8B * 4
		ref  = 0b00100, // 8B + 4B + 6B = 18B
		
		str  = 0b10000,
		time = 0b10001, // iso8601
		json = 0b10010, // array or object only
		xml  = 0b10011, //
		tree = 0b10100,
		
	}
	
	export function $hyoo_crowds_vary_encode( vary: $hyoo_crowds_vary_type ): $hyoo_crowds_vary_pack {
		
		if( vary === null ) return { tip: 'bin', bin: new Uint8Array([]) }
			
		switch( typeof vary ) {
			case "boolean": return { tip: 'bool', bin: new Uint8Array([ Number( vary ) ]) }
			case "bigint": return { tip: 'int', bin: new Uint8Array( new BigInt64Array([ vary ]).buffer ) }
			case "number": return { tip: 'real', bin: new Uint8Array( new Float64Array([ vary ]).buffer ) }
			case "string": return { tip: 'str', bin: $mol_charset_encode( vary ) }
		}
		
		if( vary instanceof Uint8Array ) return { tip: 'bin', bin: vary }
		if( vary instanceof Node ) return { tip: 'xml', bin: $mol_charset_encode( $mol_dom_serialize( vary ) ) }
		if( vary instanceof $hyoo_crowds_node_ref ) return { tip: 'ref', bin: vary.toArray() }
		if( vary instanceof $mol_time_moment ) return { tip: 'time', bin: $mol_charset_encode( vary.toString() ) }
		if( vary instanceof $mol_tree2 ) return { tip: 'tree', bin: $mol_charset_encode( $$.$mol_tree2_to_string( vary ) ) }
		
		return { tip: 'json', bin: $mol_charset_encode( JSON.stringify( vary ) ) }

	}
	
	export function $hyoo_crowds_vary_decode( { tip, bin }: $hyoo_crowds_vary_pack ): $hyoo_crowds_vary_type {
		switch( tip ) {
			case 'bin': return bin.byteLength ? bin : null
			case 'bool': return Boolean( bin[0] )
			case 'int': return new BigInt64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'real': return new Float64Array( bin.buffer, bin.byteOffset, bin.byteLength / 8 )[0]
			case 'ref': return $hyoo_crowds_node_ref.from( bin )
			case 'str': return $mol_charset_decode( bin )
			case 'time': return new $mol_time_moment( $mol_charset_decode( bin ) )
			case 'json': return JSON.parse( $mol_charset_decode( bin ) )
			case 'xml': return $mol_dom_parse( $mol_charset_decode( bin ) ).documentElement
			case 'tree': return $$.$mol_tree2_from_string( $mol_charset_decode( bin ) )
		}
	}
	
}
