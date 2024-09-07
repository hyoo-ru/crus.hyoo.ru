namespace $ {

	/** Land where Lord is King. Contains only ain info. */
	export class $hyoo_crus_home extends $hyoo_crus_entity.with({
		Selection: $hyoo_crus_atom_str,
		Hall: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_dict ),
	}) {
		
		hall_by< Node extends typeof $hyoo_crus_dict >(
			Node: Node,
			preset?: $hyoo_crus_rank_preset
		) {
			return this.Hall(null)?.ensure( preset )?.cast( Node ) ?? null
		}
		
	}
}
