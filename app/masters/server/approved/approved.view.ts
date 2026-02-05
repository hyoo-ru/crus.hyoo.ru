namespace $.$$ {
	export class $hyoo_crus_app_masters_server_approved extends $.$hyoo_crus_app_masters_server_approved {
		@ $mol_mem
		server_sub(): readonly ($mol_view)[] {
			let sub: $mol_view[] = [ this.Server_url() ];

			const can_delete = this.$.$hyoo_crus_yard_masters.masters_land().can_change();

			if ( can_delete ) {
				sub.push( this.Delete_button() );
			}

			return sub;
		}

		@ $mol_action
		delete_server( next?: any ) {
			this.$.$hyoo_crus_yard_masters.delete( this.url() );
		}
	}
}
