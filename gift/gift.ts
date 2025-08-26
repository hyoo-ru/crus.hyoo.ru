namespace $ {
	
	export function $hyoo_crus_gift_sort( gifts: $hyoo_crus_gift[] ) {
		
		const dict = new Map< string, $hyoo_crus_gift >()
		const graph = new $mol_graph< string, void >()
		
		for( const gift of gifts ) {
			const key = gift.mate().str
			dict.set( key, gift )
			graph.link( key, gift.lord().str )
			graph.link( key, '' )
		}
		
		graph.acyclic( ()=> 1 )
		const keys = [ ... graph.sorted ]
		
		return keys.map( key => dict.get( key )! ).filter( Boolean )

	}
	
	/** Given Rank and Secret */
	export class $hyoo_crus_gift extends $hyoo_crus_unit_base {
		
		static length() {
			return 48
		}
		
		@ $mol_action
		static make() {
			const sand = this.from( this.length() )
			sand.kind( 'gift' )
			return sand
		}
		
		rank( next?: typeof $hyoo_crus_rank.Value ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_crus_unit_kind.gift )
			
			const res = this.uint8( 1, next ) as typeof $hyoo_crus_rank.Value
			
			if( res < $hyoo_crus_rank_deny || res > $hyoo_crus_rank_rule ) {
				$mol_fail( new RangeError( `Wrong rank ${ res }` ) )
			}
			
			return res
		}
		
		tier() {
			return ( this.rank() & $hyoo_crus_rank_tier.rule ) as $hyoo_crus_rank_tier
		}
		
		rate() {
			return ( this.rank() & $hyoo_crus_rank_rate.just ) as $hyoo_crus_rank_rate
		}
		
		mate( next?: $hyoo_crus_link ) {
			return this.id12( 20, next )
		}
		
		path(): string {
			return `gift:${ this.mate() }`
		}
		
		_code!: Uint8Array< ArrayBuffer >
		code() {
			return this._code ?? ( this._code = new Uint8Array( this.buffer, this.byteOffset + 32, 16 ) )
		}
		
		code_exists() {
			return this.code().some( b => b )
		}
		
		dump() {
			return {
				kind: this.kind(),
				lord: this.lord(),
				mate: this.mate(),
				tier: $hyoo_crus_rank_tier[ this.tier() ],
				rate: this.rate(),
				time: this.moment().toString( 'YYYY-MM-DD hh:mm:ss' ),
			}
		}
		
		tier_min() {
			return $hyoo_crus_rank_tier.rule
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				$mol_dev_format_auto( this.lord() ),
				' 🏅 ',
				$mol_dev_format_auto( this.mate() ),
				this.code().some( v => v ) ? ' 🔐' : ' 👀',
				$hyoo_crus_rank_tier[ this.tier() ],
				':',
				this.rate(),
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
