namespace $ {
	
	export class $hyoo_crus_link extends Object {
		
		constructor( readonly str: string ) {
			super()
			
			if( !/^(([a-zæA-ZÆ0-9]{8})?_){0,3}([a-zæA-ZÆ0-9]{8})?$/.test( str ) ) {
				$mol_fail( new Error( `Wrong Link (${str})` ) )
			}
		
			this.str = str.replace( /AAAAAAAA/g, '' ).replace( /_+$/, '' )
		}
		
		static hole = new this( '' )
		
		static check( val: string ) {
			try {
				new this( val )
				return val
			} catch {
				return null
			}
		}
		
		toString() {
			return this.str
		}
		
		toJSON() {
			return this.str
		}
		
		[ Symbol.toPrimitive ]() {
			return this.str
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( { 'color': 'darkorange' }, this.str || '_' )
		}
		
		/** Binary represntation (6/12/18/24 bytes). */
		toBin() {
			return $mol_base64_ae_decode(
				( this.str ).split( '_' ).map( numb => numb || 'AAAAAAAA' ).join( '' )
			)
		}
		
		/** Make from integer (6 bytes). */
		static from_int( int: number ) {
			return new this(
				$mol_base64_ae_encode( new Uint8Array( new BigUint64Array([ BigInt( int ) ]).buffer, 0, 6 ) )
			)
		}
		
		/** Read from binary (6/12/18/24 bytes). */
		static from_bin( bin: Uint8Array ) {
			return new this(
				[ ... $mol_base64_ae_encode( bin ).match( /(.{8})/g ) ?? [] ].join( '_' )
			)	
		}
		
		static hash_cache = new WeakMap< ArrayBufferView, $hyoo_crus_link >()
		
		/** Make hash from binary (18 bytes). */
		static hash_bin( bin: ArrayBufferView ) {
			
			let link = this.hash_cache.get( bin )
			if( link ) return link
			
			const hash = $mol_crypto_hash( bin )
			link = this.from_bin( new Uint8Array( hash.buffer, 0, 18 ) )
			this.hash_cache.set( bin, link )
			
			return link
		}
		
		/** Make hash from string (18 bytes). */
		static hash_str( str: string ) {
			return this.hash_bin( $mol_charset_encode( str ) )
		}
		
		/** Land-local Peer id. */
		peer() {
			return new $hyoo_crus_link( this.str.split( '_' )[ 0 ] ?? '' )
		}

		/** Lord-local Area id. */
		area() {
			return new $hyoo_crus_link( this.str.split( '_' )[ 2 ] ?? '' )
		}
		
		/** Land-local Head id. */
		head() {
			return new $hyoo_crus_link( this.str.split( '_' )[ 3 ] ?? '' )
		}
		
		/** Link to Lord Home. */
		lord() {
			return new $hyoo_crus_link( this.str.split( '_' ).slice( 0, 2 ).join( '_' ) )
		}
		
		/** Link to Land Root. */
		land() {
			return new $hyoo_crus_link( this.str.split( '_' ).slice( 0, 3 ).join( '_' ) )
		}
		
		/** Node Link relative to base Land: `___QWERTYUI` */
		relate( base: $hyoo_crus_link ) {
			base = base.land()
			if( this.land().str !== base.str ) return this
			const head = this.head()
			return new $hyoo_crus_link(  '___' + head )
		}

		/** Absolute Node Link from relative (`___QWERTYUI`) using base Land Link. */
		resolve( base: $hyoo_crus_link ) {
			
			if( this.str === '' ) return base.land()
			if( !this.str.startsWith( '___' ) ) return this
			
			const parts = base.land().toString().split( '_' )
			while( parts.length < 3 ) parts.push( '' )
			parts.push( this.str.slice( 3 ) )
			
			return new $hyoo_crus_link( parts.join( '_' ) )
		}
	
	}
	
}
