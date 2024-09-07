namespace $ {

	/** Entity dictionary Model with Title property included by default */
	export class $hyoo_crus_entity extends $hyoo_crus_dict.with( {
		/** Entity Title - default property for use */
		Title: $hyoo_crus_atom_str,
	}) {
		
		@ $mol_mem
		title( next?: string ) {
			return this.Title( next )?.val( next ) ?? ''
		}
		
	}
	
}
