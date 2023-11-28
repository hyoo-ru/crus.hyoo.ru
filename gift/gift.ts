namespace $ {
	
	export class $hyoo_crowds_gift extends $hyoo_crowds_unit {
		
		rang( next?: $hyoo_crowds_rang ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_crowds_unit_kind.gift )
			next = this.uint8( 1, next )
			
			if( next < $hyoo_crowds_rang.get || next > $hyoo_crowds_rang.law ) {
				$mol_fail( new RangeError( `Wrong rang ${ next }` ) )
			}
			
			return next
		}
		
		time( next?: number ) {
			return this.uint48( 2, next )
		}
		
		free() {
			return new Uint8Array( this.buffer, this.byteOffset + 14, 18 )
		}
		
		dest( next?: bigint ) {
			return this.uint64( 32, next )
		}
		
		bill() {
			return new Uint8Array( this.buffer, this.byteOffset + 40, 20 )
		}
		
		tail() {
			return new Uint8Array( this.buffer, this.byteOffset + 60, 4 )
		}
		
		static compare(
			left: $hyoo_crowds_gift,
			right: $hyoo_crowds_gift,
		) {
			return ( right.time() - left.time() ) || ( right.peer() - left.peer() )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.peer().toString(16) ,
				' 🏅 ',
				$mol_dev_format_accent( $hyoo_crowds_rang[ this.rang() ] ) ,
				' ',
				this.dest().toString(16),
				' ',
				$mol_dev_format_shade( new Date( this.time() ) ) ,
			)
		}
		
	}
	
}
