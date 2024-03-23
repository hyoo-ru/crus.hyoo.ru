namespace $ {
	export class $hyoo_crus_home extends $hyoo_crus_dict.with({
		Title: $hyoo_crus_atom_str,
		Selection: $hyoo_crus_atom_str,
		Rooms: $hyoo_crus_dict_to( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_dict ) ),
	}) {
		
		room< Node extends typeof $hyoo_crus_node >(
			app: string,
			Node: Node,
			preset?: $hyoo_crus_rank_preset
		) {
			return this.Rooms?.key( app, null )?.remote_ensure( preset )?.cast( Node ) ?? null
		}
		
	}
}
