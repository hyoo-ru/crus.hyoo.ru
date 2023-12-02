namespace $.$$ {
	export class $hyoo_crowds_node_dump extends $.$hyoo_crowds_node_dump {
		
		title() {
			return this.node().slug().padEnd( 8, ' ' )
		}
		
		value() {
			return this.node().cast( $hyoo_crowds_reg ).value()
		}
		
		items() {
			return this.node().cast( $hyoo_crowds_list ).items()
		}
		
		nodes() {
			return this.node().units().map( (_,i)=> this.Inner(i) )
		}
		
		unit_tag( index: number, next?: keyof typeof $hyoo_crowds_gist_tag ) {
			if( next ) {
				const units = this.node().units()
				const unit = units[ index ]
				this.node().area().post(
					index ? units[ index - 1 ].self() : 0,
					unit.head(),
					unit.self(),
					this.node().area().gist_decode( unit ),
					next,
				)
			}
			return this.node().units()[ index ].tag()
		}
		
		unit_tip( index: number ) {
			return this.node().units()[ index ].tip()
		}
		
		unit_time( index: number ) {
			return new $mol_time_moment( this.node().units()[ index ].time() ).toString( 'YYYY-MM-DD hh:mm:ss.sss' )
		}
		
		unit_value( index: number ) {
			return this.node().cast( $hyoo_crowds_list ).items()[ index ]
		}
		
		unit_wipe( index: number, event?: Event ) {
			this.node().wipe( index )
		}
		
		node_inner( index: number ) {
			return this.node().nodes(null)[ index ]
		}
		
	}
}
