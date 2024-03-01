namespace $.$$ {
	export class $hyoo_crus_flex_field extends $.$hyoo_crus_flex_field {
		
		@ $mol_mem
		Sub() {
			switch( this.prop().type() ) {
				case 'str': return this.Str()
				case 'ref': return this.Ref()
				case 'list': return this.Items()
			}
			return new $mol_view
		}
		
		str( next?: string ) {
			return this.node( next )?.cast( $hyoo_crus_reg_str ).value( next ) ?? ''
		}
		
		ref( next?: $hyoo_crus_ref ) {
			return this.node( next )?.cast( $hyoo_crus_reg ).value( next ) ?? null
		}
		
		ref_options() {
			return this.prop().enum()?.items() ?? []
		}
		
		ref_label( ref: $hyoo_crus_vary_type ) {
			if( !ref ) return ''
			if( typeof ref === 'symbol' ) return this.prop()?.realm()!.Node( ref, $hyoo_crus_flex_thing ).title() ?? ref.description!
			return $hyoo_crus_vary_cast_str( ref ) ?? ''
		}
		
		@ $mol_mem
		rows() {
			return [
				... this.node()?.cast( $hyoo_crus_list ).items().map( ( vary, i )=> {
					return typeof vary === 'symbol' ? this.Row_ref( i ) : this.Row( i )
				} ) ?? [],
				this.Row_add(),
			]
		}
		
		@ $mol_mem
		row_add() {
			const target = this.node().cast( $hyoo_crus_list.ref( ()=> $hyoo_crus_flex_thing ) ).local_make()
			target.kind( this.prop().target() )
			this.$.$mol_state_arg.href( this.$.$mol_state_arg.link({
				ref: target.ref().description!
			}) )
		}
		
		@ $mol_mem_key
		row_value( index: number ) {
			return this.node().cast( $hyoo_crus_list ).items()[ index ]
		}
		
		@ $mol_mem_key
		row_title( index: number ) {
			const ref = this.row_value( index ) as $hyoo_crus_ref
			return this.node().realm()!.Node( ref , $hyoo_crus_flex_thing ).title() || ref?.description!
		}
		
		@ $mol_mem_key
		row_arg( index: number ) {
			const ref = ( this.row_value( index ) as $hyoo_crus_ref ).description!
			return { ref }
		}
		
	}
}
