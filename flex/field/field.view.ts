namespace $.$$ {
	export class $hyoo_crus_flex_field extends $.$hyoo_crus_flex_field {
		
		override dict_node() {
			return this.node() as $hyoo_crus_dict
		}
		
		@ $mol_mem
		Sub() {
			const type = this.prop().Type()?.val()
			switch( type ) {
				case 'vary': return this.Str()
				case 'enum': return this.Enum()
				case 'bool': return this.Bool()
				case 'int': return this.Int()
				case 'real': return this.Real()
				case 'str': return this.Str()
				case 'link': return this.Ref()
				case 'time': return this.Time()
				case 'dict': return this.Dict()
				case 'text': return this.Text()
				case 'list': return this.List()
				default: return $mol_fail( new Error( `Unsuported node type (${type})` ) )
			}
		}
		
		override enum( next?: $hyoo_crus_vary_type ) {
			return this.node( next as any )?.cast( $hyoo_crus_atom_vary ).vary( next ) ?? null
		}
		
		@ $mol_mem
		override enum_options() {
			return this.prop().Enum()?.remote()?.items_vary() ?? []
		}
		
		@ $mol_mem_key
		override enum_label( option: $hyoo_crus_vary_type ) {
			return $hyoo_crus_vary_cast_str( option ) ?? ''
		}
		
		bool( next?: boolean ) {
			return this.node( next as any )?.cast( $hyoo_crus_atom_bool ).val( next ) ?? false
		}
		
		int( next?: number ) {
			return Number( this.node( next as any )?.cast( $hyoo_crus_atom_int ).val( next === undefined ? undefined : BigInt( next ) ) ?? Number.NaN )
		}
		
		real( next?: number ) {
			return this.node( next as any )?.cast( $hyoo_crus_atom_real ).val( next ) ?? Number.NaN
		}
		
		str( next?: string ) {
			return this.node( next as any )?.cast( $hyoo_crus_atom_str ).val( next ) ?? ''
		}
		
		time( next?: $mol_time_moment ) {
			return this.node( next as any )?.cast( $hyoo_crus_atom_time ).val( next ) ?? null!
		}
		
		link( next?: $hyoo_crus_link ) {
			this.node( next as any )?.cast( $hyoo_crus_atom_link ).val( next ) ?? null
			return null
		}
		
		@ $mol_mem
		link_content() {
			return [
				... this.link_value() === null ? [] : [ this.Link_dump() ],
				... this.link_options().length ? [ this.Link_pick() ] : [],
				... this.link_value() === null ? [ this.Link_new() ] : [],
			]
		}
		
		@ $mol_mem
		link_value() {
			return this.node()?.cast( $hyoo_crus_atom_vary ).vary() ?? null
		}
		
		link_options() {
			return this.prop().Enum()?.remote()?.items_vary() ?? []
		}
		
		link_label( link: $hyoo_crus_vary_type ) {
			if( link instanceof $hyoo_crus_link ) return this.$.$hyoo_crus_glob.Node( link, $hyoo_crus_flex_thing ).Title()?.val() ?? link.str
			return $hyoo_crus_vary_cast_str( link ) ?? ''
		}
		
		link_remote() {
			return ( this.node().cast( $hyoo_crus_atom_link_to( ()=> $hyoo_crus_dict ) ) ).remote()!
		}
		
		@ $mol_action
		link_new( rights?: string ) {
			
			if( !rights ) return null
			
			const node =  this.node( 'auto' as any ).cast( $hyoo_crus_flex_thing_link )
			const Target = this.prop().Target()?.remote()
			
			if( rights === 'local' ) {
				const remote = node.ensure(null)!
				if( Target ) remote.Kind(null)?.remote( Target )
				return null
			}
			
			const preset = ( {
				deny: [],
				read: [[ null, $hyoo_crus_rank_read ]],
				post: [[ null, $hyoo_crus_rank_post( 'just' ) ]],
				pull: [[ null, $hyoo_crus_rank_pull( 'just' ) ]],
			} as Record< string, $hyoo_crus_rank_preset > )[ rights as any ]
			
			if( preset ) {
				const remote = node.ensure( preset )!
				if( Target ) remote.Kind(null)?.remote( Target )
				return null
			}
			
			return null
		}
		
		text( next?: string ) {
			return this.node( next as any )?.cast( $hyoo_crus_text ).value( next ) ?? ''
		}
		
		@ $mol_mem
		dict_title() {
			return this.node().cast( $hyoo_crus_entity ).Title()?.val() || this.node().link().str
		}
		
		@ $mol_mem
		list_items() {
			return [
				... this.node()?.units().map( ( unit, i )=> this.List_item( unit ) ) ?? [],
				... this.link_options().length ? [ this.List_pick() ] : [],
				this.List_item_add(),
			]
		}
		
		list_pick( next?: $hyoo_crus_link ) {
			if( !next ) return null
			this.node( next as any )?.cast( $hyoo_crus_list_vary ).add( next )
			return null
		}
		
		@ $mol_mem
		list_item_add() {
			const target = this.node( null as any ).cast( $hyoo_crus_list_link_to( ()=> $hyoo_crus_flex_thing ) ).local_make()
			target.Kind(null)?.remote( this.prop().Target()?.remote() )
		}
		
		@ $mol_mem_key
		list_sand( sand: $hyoo_crus_sand ) {
			return sand
		}
		
		list_item_value( sand: $hyoo_crus_sand ) {
			return $hyoo_crus_vary_cast_str( this.land().sand_decode( sand ) ) ?? ''
		}
		
		list_item_adopt( transfer : DataTransfer ) {
			let val: $hyoo_crus_vary_type = transfer.getData( "text/plain" )
			if( this.prop().Target()?.val() ) val = $hyoo_crus_vary_cast_link( val )
			return val
		}

		list_item_receive( sand: $hyoo_crus_sand, value: string ) {
			const list = this.node()!.cast( $hyoo_crus_list_vary )
			this.node()?.cast( $hyoo_crus_list_vary ).splice( [ value ], list.units().indexOf( sand ) )
		}
		
		list_receive( value: string ) {
			const list = this.node()!.cast( $hyoo_crus_list_vary )
			this.node()?.cast( $hyoo_crus_list_vary ).splice( [ value ] )
		}
		
		list_item_drag_end( sand: $hyoo_crus_sand, event: DragEvent ) {
			if( event.dataTransfer?.dropEffect !== 'move' ) return
			this.land().sand_wipe( sand )
		}
		
	}
}
