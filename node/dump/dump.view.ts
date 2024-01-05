namespace $.$$ {
	export class $hyoo_crus_node_dump extends $.$hyoo_crus_node_dump {
		
		title() {
			return this.node().head().padEnd( 8, ' ' )
		}
		
		value() {
			return this.node().cast( $hyoo_crus_reg ).value_vary()
		}
		
		items() {
			return this.node().cast( $hyoo_crus_list ).items()
		}
		
		nodes() {
			return this.node().units().map( (_,i)=> this.Inner(i) )
		}
		
		unit_tag( index: number, next?: keyof typeof $hyoo_crus_gist_tag ) {
			if( next ) {
				const units = this.node().units()
				const unit = units[ index ]
				this.node().land().post(
					index ? units[ index - 1 ].self() : '',
					unit.head(),
					unit.self(),
					this.node().land().gist_decode( unit ),
					next,
				)
			}
			return this.node().units()[ index ].tag()
		}
		
		unit_tip( index: number, next?: keyof typeof $hyoo_crus_vary_tip ) {
			if( next ) {
				const units = this.node().units()
				const unit = units[ index ]
				this.node().land().post(
					index ? units[ index - 1 ].self() : '',
					unit.head(),
					unit.self(),
					$hyoo_crus_vary_cast( next, this.node().land().gist_decode( unit ) ),
					unit.tag(),
				)
			}
			return this.node().units()[ index ].tip()
		}
		
		unit_time( index: number ) {
			return new $mol_time_moment( this.node().units()[ index ].time() ).toString( 'YYYY-MM-DD hh:mm:ss.sss' )
		}
		
		unit_value( index: number ) {
			return this.node().cast( $hyoo_crus_list ).items()[ index ]
		}
		
		@ $mol_mem_key
		unit_title( index: number ) {
			const ref = this.unit_value( index ) as symbol
			return this.node().realm()?.Node( ref, $hyoo_crus_entity ).title() || ref.description
		}
		
		unit_ref_arg( index: number ) {
			return {
				land: $hyoo_crus_vary_cast_str( this.unit_value( index ) )
			}
		}
		
		@ $mol_mem_key
		unit_ref_like( index: number ) {
			const val = this.unit_value( index )
			if( typeof val !== 'symbol' ) return false
			if( ![ 16, 24, 32 ].includes( val.description!.length ) ) return false
			try {
				$mol_base64_ae_decode( val.description! )
				return true
			} catch {
				return false
			}
		}
		
		unit_wipe( index: number, event?: Event ) {
			this.node().cast( $hyoo_crus_list ).wipe( index )
		}
		
		node_inner( index: number ) {
			return this.node().nodes(null)[ index ]
		}
		
		@ $mol_mem_key
		node_addons( index: number ) {
			return [
				... this.unit_ref_like( index )
					? [ this.Unit_ref( index ) ]
					: [ this.Unit_value( index ) ],
				this.Unit_tip( index ),
				this.Unit_tag( index ),
				this.Unit_time( index ),
				this.Unit_wipe( index ),
			]
		}
		
		add_key( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_crus_list ).has( this.key_new(), true, 'solo' )
			this.key_new( '' )
		}
		
		add_value( event: Event ) {
			if( !this.expandable() ) this.expanded( true )
			this.node().cast( $hyoo_crus_list ).splice([ this.value_new() ])
			this.value_new( '' )
		}
		
		value_str( next?: string ) {
			return this.node().cast( $hyoo_crus_reg ).value_str( next )
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
					this.Value_text(),
				] : [],
				... this.tag() === 'solo' ? [ this.Value_str() ] : [],
			]
		}
		
	}
}
