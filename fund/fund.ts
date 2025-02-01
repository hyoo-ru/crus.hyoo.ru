namespace $ {
	
	/** Registry of nodes as domain entities. */
	export class $hyoo_crus_fund< Node > extends $mol_object {
		
		constructor(
			readonly item_make: ( head: $hyoo_crus_link )=> Node
		) { super() }
		
		@ $mol_mem_key
		Item( head: $hyoo_crus_link ) {
			return this.item_make( head )
		}
		
		Data() {
			return this.Item( $hyoo_crus_land_root.data )
		}
		
		Tine() {
			return this.Item( $hyoo_crus_land_root.tine )
		}
		
	}
	
}
