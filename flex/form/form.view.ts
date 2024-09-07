namespace $.$$ {
	export class $hyoo_crus_flex_form extends $.$hyoo_crus_flex_form {
		
		@ $mol_mem
		kind() {
			
			const land = this.$.$hyoo_crus_glob.home().hall_by( $hyoo_crus_flex_domain, { '': $hyoo_crus_rank.get } )!.land()
			const domain = $hyoo_crus_flex_domain.ensure( land ) 

			return this.node().cast( $hyoo_crus_flex_thing ).Kind()?.remote() ?? domain.Kinds()?.remote_list()[0] ?? null!
		}
		
		@ $mol_mem
		fields() {
			return this.kind()?.Props()?.remote_list().map( key => this.Field( key ) ) ?? []
		}
		
		field_name( prop: $hyoo_crus_flex_prop ) {
			return prop.Title()?.val() ?? prop.ref().description!
		}
		
		field_node( prop: $hyoo_crus_flex_prop, auto?: any ) {
			return this.node().cast( $hyoo_crus_dict ).dive( prop.Key(auto)?.val() ?? prop.ref(), $hyoo_crus_node, auto )!
		}
		
		field_prop( prop: $hyoo_crus_flex_prop ) {
			return prop
		}
		
		enabled() {
			return this.node()?.can_change() ?? false
		}
		
	}
}
