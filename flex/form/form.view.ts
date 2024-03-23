namespace $.$$ {
	export class $hyoo_crus_flex_form extends $.$hyoo_crus_flex_form {
		
		@ $mol_mem
		kind() {
			
			const land = this.node().realm()!.home().hall_by( $hyoo_crus_flex_domain, $hyoo_crus_rank_public )!.land()
			const domain = $hyoo_crus_flex_domain.ensure( land ) 

			return this.node().cast( $hyoo_crus_flex_thing ).kind() ?? domain.kinds()?.[2] ?? null!
		}
		
		@ $mol_mem
		fields() {
			return this.kind()?.props()?.slice().reverse().map( key => this.Field( key ) ) ?? []
		}
		
		field_name( prop: $hyoo_crus_flex_prop ) {
			return prop.title() ?? prop.ref().description!
		}
		
		field_node( prop: $hyoo_crus_flex_prop, auto?: any ) {
			return this.node().cast( $hyoo_crus_dict ).dive( prop.key() ?? prop.ref(), $hyoo_crus_node, auto )!
		}
		
		field_prop( prop: $hyoo_crus_flex_prop ) {
			return prop
		}
		
		enabled() {
			return this.node()?.can_change() ?? false
		}
		
	}
}
