namespace $ {
	
	export const { $hyoo_crus_ref } = $mol_data_tagged({ $hyoo_crus_ref: ( val: string | symbol )=> {
		if( typeof val === 'string' ) val = Symbol.for( val.replace( /_+$/, '' ) )
		if( /^(([a-zæA-ZÆ0-9]{8})?_){0,2}([a-zæA-ZÆ0-9]{8})?$/.test( val.description! ) ) return val
		$mol_fail( new Error( `Wrong ref (${ val.description! })` ) )
	} })
	
	/** Reference to Lord/Land/Node. May be absolute or relative. */
	export type $hyoo_crus_ref = typeof $hyoo_crus_ref.Value
	
	/** Land ref of any ref */
	export function $hyoo_crus_ref_land( ref: $hyoo_crus_ref ) {
		return $hyoo_crus_ref( ref.description!.slice( 0, 17 ) )
	}

	/** Peer part of Ref */
	export function $hyoo_crus_ref_peer( ref: $hyoo_crus_ref ) {
		return ref.description!.split( '_' )[ 0 ] ?? ''
	}
	
	/** Head part of Node Ref */
	export function $hyoo_crus_ref_head( ref: $hyoo_crus_ref ) {
		return ref.description!.split( '_' )[ 2 ] ?? ''
	}

	/** Encode to binary (12/18 bytes) */
	export function $hyoo_crus_ref_encode( ref: $hyoo_crus_ref ) {
		return $mol_base64_ae_decode(
			( ref.description! || '_' )
				.split( /_/g )
				.map( numb => numb || 'AAAAAAAA' )
				.join( '' )
				//.padEnd( 32, 'AAAAAAAA' )
		)
	}

	/** Read from binary (12/18 bytes) */
	export function $hyoo_crus_ref_decode( bin: Uint8Array ) {
		return $hyoo_crus_ref(
			[ ... $mol_base64_ae_encode( bin ).match( /(.{8})/g ) ?? [] ]
				.map( numb => numb === 'AAAAAAAA' ? '' : numb )
				.join( '_' ).replace( /_+$/, '' )
		)
	}

	/** Make Node Ref relative to base Land: `__QWERTYUI` */
	export function $hyoo_crus_ref_relate( base: $hyoo_crus_ref, ref: $hyoo_crus_ref ) {
		if( !ref.description!.padEnd( 18, '_' ).startsWith( base.description!.slice( 0, 18 ).padEnd( 18, '_' ) ) ) return ref
		return $hyoo_crus_ref( ( '__' + ( ref.description!.split( '_' )[2] ?? '' ) ).replace( /_+$/, '' ) )
	}

	/** Make absolute Node Ref from relative (`__QWERTYUI`) using base Land Ref. */
	export function $hyoo_crus_ref_resolve( base: $hyoo_crus_ref, ref: $hyoo_crus_ref ) {
		if( !ref.description ) return $hyoo_crus_ref_land( base )
		if( !ref.description!.startsWith( '__' ) ) return ref
		return $hyoo_crus_ref( base.description!.slice( 0, 18 ).padEnd( 18, '_' ) + ref.description!.slice( 2 ) )
	}	

}
