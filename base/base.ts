namespace $ {
	export class $hyoo_crus_base extends $hyoo_crus_dict.with({
		Title: $hyoo_crus_atom_str,
		Selection: $hyoo_crus_atom_str,
		Profiles: $hyoo_crus_dict_to( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_dict ) ),
	}) {
		
		// @ $mol_mem_key
		profile( app: string, preset?: $hyoo_crus_rank_preset ) {
			return this.Profiles?.key( app, null )?.remote_ensure( preset )?.land() ?? null
		}
		
	}
}
