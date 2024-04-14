namespace $ {
	export class $hyoo_crus_home extends $hyoo_crus_dict.with({
		title: $hyoo_crus_atom_str,
		selection: $hyoo_crus_atom_str,
		hall: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_dict ),
	}) {
		
		hall_by< Node extends typeof $hyoo_crus_dict >(
			Node: Node,
			preset?: $hyoo_crus_rank_preset
		) {
			return this.hall?.remote_ensure( preset )?.cast( Node ) ?? null
		}
		
	}
}
