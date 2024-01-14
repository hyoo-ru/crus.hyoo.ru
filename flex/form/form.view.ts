namespace $.$$ {
	export class $hyoo_crus_flex_form extends $.$hyoo_crus_flex_form {
		
		@ $mol_mem
		kind() {
			
			const land = this.node().realm()!.home().Land( 'Universe' )
			const domain = $hyoo_crus_flex_domain.ensure( land )

			return this.node().cast( $hyoo_crus_flex_thing ).kind() ?? domain.kinds()![2]
		}
		
		@ $mol_mem
		fields() {
			return this.kind()?.props()?.slice().reverse().map( key => this.Field( key ) ) ?? []
		}
		
		field_name( prop: $hyoo_crus_flex_prop ) {
			return prop.title() ?? prop.ref().description!
		}
		
		field_node( prop: $hyoo_crus_flex_prop ) {
			return this.node().cast( $hyoo_crus_dict ).dive( prop.key() ?? prop.ref(), $hyoo_crus_node )
		}
		
		field_prop( prop: $hyoo_crus_flex_prop ) {
			return prop
		}
		
	}
}
