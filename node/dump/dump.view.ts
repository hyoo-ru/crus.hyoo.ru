namespace $.$$ {
	export class $hyoo_crowds_node_dump extends $.$hyoo_crowds_node_dump {
		
		title() {
			return this.head().toString(36)
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
		
		unit_tag( index: number ) {
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
		
		node_inner( index: number ) {
			return this.node().nodes(null)[ index ]
		}
		
	}
}
