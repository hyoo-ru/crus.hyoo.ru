namespace $ {

	/** Land where Lord is King. Contains only main info. */
	export class $hyoo_crus_home extends $hyoo_crus_entity.with({
		Selection: $hyoo_crus_atom_text,
		Hall: $hyoo_crus_atom_link_to( ()=> $hyoo_crus_dict ),
	}) {
		
		hall_by< Node extends typeof $hyoo_crus_dict >(
			Node: Node,
			auto?: null,
		) {
			return this.Hall( auto )?.ensure( auto === null ? this.land() : undefined )?.cast( Node ) ?? null
		}
		
	}
}
