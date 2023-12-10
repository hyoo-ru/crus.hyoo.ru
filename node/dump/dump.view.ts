namespace $.$$ {
	export class $hyoo_cras_node_dump extends $.$hyoo_cras_node_dump {
		
		title() {
			return this.node().slug().padEnd( 8, ' ' )
		}
		
		value() {
			return this.node().cast( $hyoo_cras_reg ).value_vary()
		}
		
		items() {
			return this.node().cast( $hyoo_cras_list ).items()
		}
		
		nodes() {
			return this.node().units().map( (_,i)=> this.Inner(i) )
		}
		
		unit_tag( index: number, next?: keyof typeof $hyoo_cras_gist_tag ) {
			if( next ) {
				const units = this.node().units()
				const unit = units[ index ]
				this.node().land().post(
					index ? units[ index - 1 ].self() : 0,
					unit.head(),
					unit.self(),
					this.node().land().gist_decode( unit ),
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
			return this.node().cast( $hyoo_cras_list ).items()[ index ]
		}
		
		unit_wipe( index: number, event?: Event ) {
			this.node().cast( $hyoo_cras_list ).wipe( index )
		}
		
		node_inner( index: number ) {
			return this.node().nodes(null)[ index ]
		}
		
		add_key( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_cras_list ).has( this.key_new(), true, 'head' )
			this.key_new( '' )
		}
		
		add_value( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_cras_list ).splice([ this.value_new() ])
			this.value_new( '' )
		}
		
		value_str( next?: string ) {
			return this.node().cast( $hyoo_cras_reg ).value_str( next )
		}
		
		text( next?: string ) {
			return this.node().cast( $hyoo_cras_text ).str( next )
		}
		
		@ $mol_mem
		editors() {
			return [
				... this.tag() === 'keys' ? [ this.Add_key() ] : [],
				... this.tag() === 'vals' ? [
					this.Add_value(),
					this.Value_text(),
				] : [],
				... this.tag() === 'head' ? [ this.Value_str() ] : [],
			]
		}
		
	}
}
