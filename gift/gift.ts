namespace $ {
	
	/** Given Rank and Secret */
	export class $hyoo_crus_gift extends $hyoo_crus_unit {
		
		rank( next?: $hyoo_crus_rank ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_crus_unit_kind.gift )
			next = this.uint8( 1, next )
			
			if( next < $hyoo_crus_rank.nil || next > $hyoo_crus_rank.law ) {
				$mol_fail( new RangeError( `Wrong rank ${ next }` ) )
			}
			
			return next
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		free() {
			return new Uint8Array( this.buffer, this.byteOffset + 26, 6 )
		}
		
		_dest!: $hyoo_crus_ref
		dest( next?: $hyoo_crus_ref ) {
			if( next === undefined && this._dest !== undefined ) return this._dest
			else return this._dest = this.id12( 14, next )
		}
		
		key(): string {
			return this.dest().description!
		}
		
		bill() {
			return new Uint8Array( this.buffer, this.byteOffset + 32, 32 )
		}
		
		static compare(
			left: $hyoo_crus_gift,
			right: $hyoo_crus_gift,
		) {
			return ( right.time() - left.time() ) || ( right.peer() > left.peer() ? 1 : right.peer() < left.peer() ? -1 : 0 )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.peer(),
				' 🏅 ',
				$mol_dev_format_span( {}, this.dest().description || '_' ),
				this.bill().some( v => v ) ? ' 🔐' : ' 📢',
				$hyoo_crus_rank[ this.rank() ],
				' ',
				$mol_dev_format_shade( new $mol_time_moment( this.time() ).toString( 'YYYY-MM-DD hh:mm:ss.sss' ) ),
			)
		}
		
	}
	
}
