namespace $.$$ {
	export class $hyoo_crus_node_dump extends $.$hyoo_crus_node_dump {
		
		title() {
			return this.node().head().padEnd( 8, ' ' )
		}
		
		value() {
			return this.node().cast( $hyoo_crus_atom_vary ).vary()
		}
		
		items() {
			return this.node().cast( $hyoo_crus_list_vary ).items_vary()
		}
		
		@ $mol_mem
		units() {
			return this.node().land().sand_ordered({ head: this.node().head(), peer: null })
		}
		
		@ $mol_mem
		nodes() {
			return this.units().map( (_,i)=> this.Inner(i) )
		}
		
		unit_tag( index: number, next?: keyof typeof $hyoo_crus_sand_tag ) {
			if( next ) {
				const units = this.units()
				const unit = units[ index ]
				this.node().land().post(
					index ? units[ index - 1 ].self() : '',
					unit.head(),
					unit.self(),
					this.node().land().sand_decode( unit ),
					next,
				)
			}
			return this.units()[ index ].tag()
		}
		
		unit_tip( index: number, next?: keyof typeof $hyoo_crus_vary_tip ) {
			if( next ) {
				const units = this.units()
				const unit = units[ index ]
				this.node().land().post(
					index ? units[ index - 1 ].self() : '',
					unit.head(),
					unit.self(),
					$hyoo_crus_vary_cast( next, this.node().land().sand_decode( unit ) ),
					unit.tag(),
				)
			}
			return this.units()[ index ].tip()
		}
		
		unit_time( index: number ) {
			return $hyoo_crus_time_dump( this.units()[ index ].time() )
		}
		
		unit_value( index: number ) {
			return this.units()[ index ]
		}
		
		unit_wipe( index: number, event?: Event ) {
			this.node().land().sand_wipe( this.units()[ index ] )
		}
		
		node_inner( index: number ) {
			return this.node().land().Node( $hyoo_crus_dict ).Item( this.units()[ index ].self() )
		}
		
		add_key( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_crus_list_vary ).has( this.key_new(), true, 'solo' )
			this.key_new( '' )
		}
		
		add_value( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_crus_list_vary ).splice([ this.value_new() ])
			this.value_new( '' )
		}
		
		value_str( next?: string ) {
			return this.node().cast( $hyoo_crus_atom_str ).val( next ) ?? ''
		}
		
		text( next?: string ) {
			return this.node().cast( $hyoo_crus_text ).str( next )
		}
		
		@ $mol_mem
		editors() {
			return [
				... this.tag() === 'keys' ? [ this.Add_key() ] : [],
				... this.tag() === 'vals' ? [
					this.Add_value(),
					// this.Value_text(),
				] : [],
				// ... this.tag() === 'solo' ? [ this.Value_str() ] : [],
			]
		}
		
	}
}
