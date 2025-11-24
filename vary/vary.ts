namespace $ {
	
	/** Supported primitive types. */
	export type $hyoo_crus_vary_type =
	| null | boolean | number | bigint | string
	| Uint8Array< ArrayBuffer > | Uint16Array< ArrayBuffer > | Uint32Array< ArrayBuffer > | BigUint64Array< ArrayBuffer >
	| Int8Array< ArrayBuffer > | Int16Array< ArrayBuffer > | Int32Array< ArrayBuffer > | BigInt64Array< ArrayBuffer >
	| Float64Array< ArrayBuffer > | Float32Array< ArrayBuffer > | Float64Array< ArrayBuffer >
	| $mol_time_moment | $mol_time_duration | $mol_time_interval
	| $mol_tree2 | $hyoo_crus_link | Element
	| readonly $hyoo_crus_vary_type[] | { [ key in string ]: $hyoo_crus_vary_type }
	
	export let $hyoo_crus_vary = $mol_vary.zone()
	
	$hyoo_crus_vary.type({
		type: $hyoo_crus_link,
		keys: [ 'link' ],
		lean: obj => [ obj.toBin() ],
		rich: ([ bin ])=> $hyoo_crus_link.from_bin( bin ),
	})
	
	$hyoo_crus_vary.type({
		type: $mol_time_duration,
		keys: [ 'dura' ],
		lean: obj => [ obj.toString() ],
		rich: ([ str ])=> new $mol_time_duration( str ),
	})
	
	$hyoo_crus_vary.type({
		type: $mol_time_moment,
		keys: [ 'time' ],
		lean: obj => [ obj.toString() ],
		rich: ([ str ])=> new $mol_time_moment( str ),
	})
	
	$hyoo_crus_vary.type({
		type: $mol_time_interval,
		keys: [ 'span' ],
		lean: obj => [ obj.toString() ],
		rich: ([ str ])=> new $mol_time_interval( str ),
	})
	
	$hyoo_crus_vary.type({
		type: $mol_tree2,
		keys: [ 'tree' ],
		lean: obj => [ $$.$mol_tree2_to_string( obj ) ],
		rich: ([ str ])=> $$.$mol_tree2_from_string( str ),
	})
	
	export function $hyoo_crus_vary_switch< Ways extends {
		
		none: ( vary: null )=> any,
		blob: ( vary: ArrayBufferView< ArrayBuffer > )=> any,
		bool: ( vary: boolean )=> any,
		bint: ( vary: bigint )=> any,
		real: ( vary: number )=> any,
		link: ( vary: $hyoo_crus_link )=> any,
		text: ( vary: string )=> any,
		time: ( vary: $mol_time_moment )=> any,
		dura: ( vary: $mol_time_duration )=> any,
		span: ( vary: $mol_time_interval )=> any,
		dict: ( vary: {} )=> any,
		list: ( vary: any[] )=> any,
		elem: ( vary: Element )=> any,
		tree: ( vary: $mol_tree2 )=> any,
		
	} >(
		vary: $hyoo_crus_vary_type,
		ways: Ways,
	): $mol_type_result< Ways[ keyof Ways ] > {
		
		if( vary === null ) return ways.none( vary )
			
		switch( typeof vary ) {
			case "boolean": return ways.bool( vary )
			case "bigint": return ways.bint( vary )
			case "number": return ways.real( vary )
			case "string": return ways.text( vary )
		}
		
		if( ArrayBuffer.isView( vary ) ) return ways.blob( vary as ArrayBufferView< ArrayBuffer > )
		
		switch( Reflect.getPrototypeOf( vary ) ) {
			case Object.prototype: return ways.dict( vary )
			case Array.prototype: return ways.list( vary as any[] )
			case $hyoo_crus_link.prototype: return ways.link( vary as $hyoo_crus_link )
			case $mol_time_moment.prototype: return ways.time( vary as $mol_time_moment )
			case $mol_time_duration.prototype: return ways.dura( vary as $mol_time_duration )
			case $mol_time_interval.prototype: return ways.span( vary as $mol_time_interval )
			case $mol_tree2.prototype: return ways.tree( vary as $mol_tree2 )
		}
		
		if( vary instanceof $mol_dom_context.Element ) return ways.elem( vary )
		
		return $mol_fail( new TypeError( `Unsupported vary type`, { cause: { vary }} ) )
	}
	
}
