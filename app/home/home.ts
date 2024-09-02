namespace $ {
	
	export class $hyoo_crus_app_home extends $hyoo_crus_home.with({
		Aliases: $hyoo_crus_list_str,
		Uptime: $hyoo_crus_atom_int,
		Stat: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_app_stat ),
	}) {
		
		uptime( next?: bigint ) {
			return this.Uptime( next )?.val( next ) ?? 0n
		}
		
		stat( auto?: any ) {
			return this.Stat( auto )?.ensure( this.land() ) ?? null
		}
		
		init() {}
		tick() {}
		
	}
	
}
