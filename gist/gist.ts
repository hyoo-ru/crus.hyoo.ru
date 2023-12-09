namespace $ {
	
	export enum $hyoo_crowds_gist_tag {
		/** Itself value */
		term = 0b00,
		/** Value in first sub node */
		head = 0b01,
		/** List of values */
		vals = 0b10,
		/** List of keys */
		keys = 0b11,
	}
	
	export class $hyoo_crowds_gist extends $hyoo_crowds_unit {
		
		hint(
			tip = 'null' as keyof typeof $hyoo_crowds_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			this.uint8( 0, ( $hyoo_crowds_gist_tag[ tag ] << 1 )|( $hyoo_crowds_vary_tip[ tip ] << 3 ) )
		}
		
		tip() {
			return $hyoo_crowds_vary_tip[ this.uint8( 0 ) >> 3 ] as keyof typeof $hyoo_crowds_vary_tip
		}
		
		pic() {
			return Boolean( this.uint8( 0 ) & 0b01000000 )
		}
		
		utf() {
			return Boolean( this.uint8( 0 ) & 0b10000000 )
		}
		
		tag() {
			return $hyoo_crowds_gist_tag[ ( ( this.uint8( 0 ) >> 1 ) & 0b11 ) ] as keyof typeof $hyoo_crowds_gist_tag
		}
		
		nil() {
			return !this.uint16(0)
		}
		
		size( next?: number ) {
			return this.uint8( 1, next )
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		self( next?: number ) {
			return this.uint48( 14, next )
		}
		
		head( next?: number ) {
			return this.uint48( 20, next )
		}
		
		lead( next?: number ) {
			return this.uint48( 26, next )
		}
		
		hash(
			next?: Uint8Array,
			tip = 'null' as keyof typeof $hyoo_crowds_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 32, 20 )
			if( next !== undefined ) {
				this.hint( tip, tag )
				this.size( 255 )
				bin.set( next )
			}
			if( this.size() > 32 ) return bin
			$mol_fail( new Error( 'No stored hash' ) )
		}
		
		meta() {
			return new Uint8Array( this.buffer, this.byteOffset + 42, 12 )
		}
		
		data(
			next?: Uint8Array,
			tip = 'null' as keyof typeof $hyoo_crowds_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			if( next === undefined ) {
				const size = this.size()
				if( size > 32 ) $mol_fail( new Error( 'Too long data' ) )
				return new Uint8Array( this.buffer, this.byteOffset + 32, size )
			} else {
				this.hint( tip, tag )
				if( next.byteLength > 32 ) $mol_fail( new Error( 'Too long data' ) )
				this.uint8( 1, next.byteLength )
				const bin = new Uint8Array( this.buffer, this.byteOffset + 32, next.byteLength )
				bin.set( next )
				return bin
			}
		}
		
		idea() {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 20, 44 )
			const hash = $mol_crypto_hash( bin )
			const buf = new $mol_buffer( hash.buffer )
			return buf.uint48(0)
		}
		
		/** Compare gists on timeline ( right - left ) */
		static compare(
			left: $hyoo_crowds_gist,
			right: $hyoo_crowds_gist,
		) {
			return ( right.time() - left.time() ) || ( right.peer() - left.peer() )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				this.peer().toString(16),
				' ',
				$mol_dev_format_shade( new Date( this.time() ) ),
				' ',
				this.lead().toString(16),
				$mol_dev_format_shade( '\\' ),
				$mol_dev_format_accent( this.head().toString(16) ),
				$mol_dev_format_shade( '/' ),
				this.self().toString(16),
				' ',
				$mol_dev_format_shade(
					this.tag(),
					' ',
					this.tip(),
				),
				' ',
				this.size() > 32
					? $mol_dev_format_shade( this.hash().toString(16).padStart( 32, '0' ) )
					: $mol_dev_format_native( $hyoo_crowds_vary_decode({ tip: this.tip(), bin: this.data() }) ),
			)
		}
		
	}

}
