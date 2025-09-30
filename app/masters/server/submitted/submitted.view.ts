namespace $.$$ {
	export class $hyoo_crus_app_masters_server_submitted extends $.$hyoo_crus_app_masters_server_submitted {
		@ $mol_mem
		server_sub(): readonly ($mol_view)[] {
			let sub: $mol_view[] = [ this.Server_url() ];

			const can_make_decision = this.$.$hyoo_crus_yard_masters.masters_land().can_change();
			const already_approved = this.$.$hyoo_crus_yard_masters.list().includes( this.url() );

			if ( can_make_decision && !already_approved ) {
				sub.push( this.Reject_button() );
				sub.push( this.Approve_button() );
			}

			return sub;
		}

		@ $mol_action
		approve_server( next?: any ) {
			this.$.$hyoo_crus_yard_masters.append( this.url() );
		}

		@ $mol_action
		reject_server( next?: any ) {
			this.$.$hyoo_crus_yard_masters.reject( this.url() );
		}
	}
}
