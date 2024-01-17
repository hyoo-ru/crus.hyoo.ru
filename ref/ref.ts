namespace $ {
	
	export const { $hyoo_crus_ref } = $mol_data_tagged({ $hyoo_crus_ref: ( val: string | symbol )=> {
		if( typeof val === 'string' ) val = Symbol.for( val.replace( /_+$/, '' ) )
		if( /^(([a-zæA-ZÆ0-9]{8})?_){0,3}([a-zæA-ZÆ0-9]{8})?$/.test( val.description! ) ) return val
		$mol_fail( new Error( `Wrong ref (${ val.description! })` ) )
	} })
	
	export function $hyoo_crus_ref_home( ref: typeof $hyoo_crus_ref.Value ) {
		return $hyoo_crus_ref( ref.description!.slice( 0, 17 ) )
	}

	export function $hyoo_crus_ref_root( ref: typeof $hyoo_crus_ref.Value ) {
		return $hyoo_crus_ref( ref.description!.split( '_' ).slice( 0, 3 ).join( '_' ) )
	}

	export function $hyoo_crus_ref_lord( ref: typeof $hyoo_crus_ref.Value ) {
		return $hyoo_crus_ref_home( ref )
	}

	export function $hyoo_crus_ref_land( ref: typeof $hyoo_crus_ref.Value ) {
		return ref.description!.split( '_' )[ 2 ] ?? ''
	}

	export function $hyoo_crus_ref_head( ref: typeof $hyoo_crus_ref.Value ) {
		return ref.description!.split( '_' )[ 3 ] ?? ''
	}

	export function $hyoo_crus_ref_encode( ref: typeof $hyoo_crus_ref.Value ) {
		return $mol_base64_ae_decode(
			ref.description!
				.split( /_/g )
				.map( numb => numb || 'AAAAAAAA' )
				.join( '' )
				//.padEnd( 32, 'AAAAAAAA' )
		)
	}

	export function $hyoo_crus_ref_decode( bin: Uint8Array ) {
		return $hyoo_crus_ref(
			[ ... $mol_base64_ae_encode( bin ).match( /(.{8})/g ) ?? [] ]
				.map( numb => numb === 'AAAAAAAA' ? '' : numb )
				.join( '_' ).replace( /_+$/, '' )
		)
	}

	export function $hyoo_crus_ref_relate( base: typeof $hyoo_crus_ref.Value, ref: typeof $hyoo_crus_ref.Value ) {
		if( !ref.description!.padEnd( 19, '_' ).startsWith( base.description!.padEnd( 19, '_' ) ) ) return ref
		return $hyoo_crus_ref( ( '___' + ( ref.description!.split( '_' )[3] ?? '' ) ).replace( /_+$/, '' ) )
	}	

	export function $hyoo_crus_ref_resolve( base: typeof $hyoo_crus_ref.Value, ref: typeof $hyoo_crus_ref.Value ) {
		if( !ref.description ) return $hyoo_crus_ref_root( base )
		if( !ref.description!.startsWith( '___' ) ) return ref
		return $hyoo_crus_ref( base.description!.padEnd( 18, '_' ) + ref.description!.slice( 2 ) )
	}	

}
