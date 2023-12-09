namespace $ {
	
	/** Registry of nodes as domain entities. */
	export class $hyoo_cras_fund< Key, Node > extends $mol_object {
		
		constructor(
			readonly item_make: ( head: Key )=> Node
		) { super() }
		
		@ $mol_mem_key
		Item( head: Key ) {
			return this.item_make( head )
		}
		
	}
	
}
