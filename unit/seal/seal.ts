namespace $ {
	
	/**  Sign for hash list */
	export class $hyoo_crus_unit_seal extends $hyoo_crus_unit_base {
		
		static length( size: number ) {
			return Math.ceil( ( 84 + size * 12 ) / 8 ) * 8
		}

		static make( size: number, wide: boolean ) {
			const seal = this.from( this.length( size ) )
			seal.kind( 'seal' )
			seal.meta({ size, wide })
			return seal
		}

		meta( next?: { size: number, wide: boolean } ) {
			return this.uint8( 1, next && ( next.size | ( next.wide ? 0b1000_0000 : 0 ) ) )
		}

		size() {
			return this.meta() & 0b1111
		}

		wide() {
			return Boolean( this.meta() & 0b1000_0000 )
		}

		_alive_count = 0
		
		alive_shift( shift: number ) {
			this._alive_count += shift
		}
		
		alive_full() {
			return this.size() === this._alive_count
		}
		
		alive_free() {
			return 0 === this._alive_count
		}
		
		hash_item( index: number, next?: $hyoo_crus_link ) {
			return this.id12( 20 + index * 12, next )
		}
		
		_hash_list!: readonly $hyoo_crus_link[]
		hash_list( next?: $hyoo_crus_link[] ) {
			
			if( next ) {
				
				for( let i = 0; i < next.length; ++i ) {
					this.hash_item( i, next[i] )
				}
				
				// this.size( next.length )
				
				return this._hash_list = next
				
			} else {
				
				const list = []
				const count = this.size()
				
				for( let i = 0; i < count; ++ i ) {
					list.push( this.hash_item( i ) )
				}
				
				return this._hash_list = list
			}
			
		}
		
		/** Hash for signing. */
		_shot!: $hyoo_crus_link
		shot() {
			return this._shot ?? ( this._shot = $hyoo_crus_link.hash_bin( new Uint8Array( this.buffer, this.byteOffset, this.byteLength - 64 ) ) )
		}
		
		sign( next?: Uint8Array< ArrayBuffer > ) {
			const buf = new Uint8Array( this.buffer, this.byteOffset + this.byteLength - 64, 64 )
			if( next ) buf.set( next )
			return buf
		}
		
		@ $mol_memo.method
		work() {
			
			let int = this.uint16( this.byteLength - 64 )
			
			let count = 0
			while( int & 1 ) {
				int >>>= 1
				++ count
			}
			
			return count
		}
		
		rate_min() {
			return 15 - this.work()
		}
		
		tier_min() {
			return $hyoo_crus_rank_tier.post
		}
		
		rank_min() {
			return this.tier_min() | this.rate_min()
		}
		
		path(): string {
			return `seal:${ this.lord() }/${ $hyoo_crus_time_dump( this.time() ) } #${ this.tick() }`
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				$mol_dev_format_auto( this.lord() ),
				' ✍ ',
				$mol_dev_format_auto( this.hash_list() ),
				' ',
				$mol_dev_format_shade(
					this.moment().toString( 'YYYY-MM-DD hh:mm:ss' ),
					' #',
					this.tick(),
				),
			)
		}
		
	}
	
}
