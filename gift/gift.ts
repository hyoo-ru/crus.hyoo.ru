namespace $ {
	
	export function $hyoo_crus_gift_sort( gifts: $hyoo_crus_gift[] ) {
		
		const dict = new Map< string, $hyoo_crus_gift >()
		const graph = new $mol_graph< string, void >()
		
		for( const gift of gifts ) {
			const key = gift.mate()?.lord().str ?? ''
			dict.set( key, gift )
			graph.link( key, gift.pass().lord().str )
			graph.link( key, '' )
		}
		
		graph.acyclic( ()=> 1 )
		const keys = [ ... graph.sorted ]
		
		return keys.map( key => dict.get( key )! ).filter( Boolean )

	}
	
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
		
		mate_link( next?: $hyoo_crus_link ) {
			return this.id18( 32, next )
		}
		
		_mate = null as $hyoo_crus_auth_pass | null
		mate( next?: $hyoo_crus_auth_pass ) {
			if( next === undefined ) return this._mate
			this.mate_link( $hyoo_crus_link.hash_bin( next ) )
			return this._mate = next
		}
		
		path(): string {
			return `gift:${ this.mate()?.lord() ?? '' }`
		}
		
		bill() {
			return new Uint8Array( this.buffer, this.byteOffset + 16, 16 )
		}
		
		dump() {
			return {
				kind: this.kind(),
				peer: this.pass().peer(),
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
				$mol_dev_format_auto( this.pass_link() ),
				' 🏅 ',
				$mol_dev_format_auto( this.mate()?.peer() ?? $hyoo_crus_link.hole ),
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
