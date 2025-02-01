namespace $ {
	
	/** Given Rank and Secret */
	export class $hyoo_crus_gift extends $hyoo_crus_unit {
		
		rank( next?: typeof $hyoo_crus_rank.Value ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_crus_unit_kind.gift )
			const res = this.uint8( 1, next ) as typeof $hyoo_crus_rank.Value
			
			if( res < $hyoo_crus_rank_deny || res > $hyoo_crus_rank_rule ) {
				$mol_fail( new RangeError( `Wrong rank ${ res }` ) )
			}
			
			return res
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		free() {
			return new Uint8Array( this.buffer, this.byteOffset + 26, 6 )
		}
		
		_peer!: $hyoo_crus_link
		peer( next?: $hyoo_crus_link ) {
			if( next === undefined && this._peer !== undefined ) return this._peer
			else return this._peer = this.id6( 2, next )
		}
		
		_mate!: $hyoo_crus_link
		mate( next?: $hyoo_crus_link ) {
			if( next === undefined && this._mate !== undefined ) return this._mate
			else return this._mate = this.id18( 14, next )
		}
		
		key(): string {
			return `gift:${ this.mate() }`
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
		
		dump() {
			return {
				kind: this.kind(),
				peer: this.peer(),
				dest: this.mate(),
				tier: $hyoo_crus_rank_tier[ this.rank() &~ $hyoo_crus_rank_rate.just ],
				work: this.work(),
				time: $hyoo_crus_time_dump( this.time() ),
			}
		}
		
		rank_min() {
			return $hyoo_crus_rank( $hyoo_crus_rank_rule | ( $hyoo_crus_rank_rate.just - this.work() ) )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				$mol_dev_format_auto( this.peer() ),
				' 🏅 ',
				$mol_dev_format_auto( this.mate() ),
				this.bill().some( v => v ) ? ' 🔐' : ' 👀',
				$hyoo_crus_rank_tier[ this.rank() &~ $hyoo_crus_rank_rate.just ],
				':',
				this.rank() & $hyoo_crus_rank_rate.just,
				' ',
				$mol_dev_format_shade( $hyoo_crus_time_dump( this.time() ) ),
			)
		}
		
	}
	
}
