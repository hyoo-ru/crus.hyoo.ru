namespace $ {
	
	export class $hyoo_crus_gift extends $hyoo_crus_unit {
		
		rang( next?: $hyoo_crus_rang ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_crus_unit_kind.gift )
			next = this.uint8( 1, next )
			
			if( next < $hyoo_crus_rang.get || next > $hyoo_crus_rang.law ) {
				$mol_fail( new RangeError( `Wrong rang ${ next }` ) )
			}
			
			return next
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		free() {
			return new Uint8Array( this.buffer, this.byteOffset + 14, 18 )
		}
		
		_dest!: string
		dest( next?: string ) {
			if( next === undefined && this._dest !== undefined ) return this._dest
			else return this._dest = this.id12( 56, next )
		}
		
		bill() {
			return new Uint8Array( this.buffer, this.byteOffset + 32, 20 )
		}
		
		tail() {
			return new Uint8Array( this.buffer, this.byteOffset + 42, 4 )
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
				$mol_dev_format_accent( $hyoo_crus_rang[ this.rang() ] ) ,
				' ',
				this.dest(),
				' ',
				$mol_dev_format_shade( new Date( this.time() ) ) ,
			)
		}
		
	}
	
}
