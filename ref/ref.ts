namespace $ {
	
	export const { $hyoo_crus_ref } = $mol_data_tagged({ $hyoo_crus_ref: ( val: string | symbol )=> {
		if( typeof val === 'string' ) val = Symbol.for( val.replace( /_+$/, '' ) )
		if( /^(([a-zæA-ZÆ0-9]{8})?_){0,3}([a-zæA-ZÆ0-9]{8})?$/.test( val.description! ) ) return val
		$mol_fail( new Error( `Wrong ref (${ val.description! })` ) )
	} })
	
	/** Reference to Lord/Land/Node. May be absolute or relative. */
	export type $hyoo_crus_ref = typeof $hyoo_crus_ref.Value
	
	/** Lord ref of any ref */
	export function $hyoo_crus_ref_lord( ref: $hyoo_crus_ref ) {
		return $hyoo_crus_ref( ref.description!.split( '_' ).slice( 0, 2 ).join( '_' ) )
	}

	/** Land ref of any ref */
	export function $hyoo_crus_ref_land( ref: $hyoo_crus_ref ) {
		return $hyoo_crus_ref( ref.description!.split( '_' ).slice( 0, 3 ).join( '_' ).replace( /_$/, '' ) )
	}

	/** Peer part of Ref */
	export function $hyoo_crus_ref_peer( ref: $hyoo_crus_ref ) {
		return ref.description!.split( '_' )[ 0 ] ?? ''
	}
	
	/** Head part of Node Ref */
	export function $hyoo_crus_ref_head( ref: $hyoo_crus_ref ) {
		return ref.description!.split( '_' )[ 3 ] ?? ''
	}

	/** Encode to binary (12/18/24 bytes) */
	export function $hyoo_crus_ref_encode( ref: $hyoo_crus_ref ) {
		return $mol_base64_ae_decode(
			( ref.description! || '_' )
				.split( '_' )
				.map( numb => numb || 'AAAAAAAA' )
				.join( '' )
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

	/** Make Node Ref relative to base Land: `___QWERTYUI` */
	export function $hyoo_crus_ref_relate( base: $hyoo_crus_ref, ref: $hyoo_crus_ref ) {
		base = $hyoo_crus_ref_land( base )
		if( $hyoo_crus_ref_land( ref ) !== base ) return ref
		const head = $hyoo_crus_ref_head( ref )
		return $hyoo_crus_ref(  head ? '___' + head : '' )
	}

	/** Make absolute Node Ref from relative (`___QWERTYUI`) using base Land Ref. */
	export function $hyoo_crus_ref_resolve( base: $hyoo_crus_ref, ref: $hyoo_crus_ref ) {
		
		if( !ref.description ) return $hyoo_crus_ref_land( base )
		if( !ref.description!.startsWith( '___' ) ) return ref
		
		const parts = base.description!.split( '_' ).slice( 0, 3 )
		while( parts.length < 3 ) parts.push( '' )
		parts.push( ref.description!.slice( 3 ) )
		
		return $hyoo_crus_ref( parts.join( '_' ) )
	}	

}
