namespace $.$$ {
	export class $hyoo_crus_app_masters extends $.$hyoo_crus_app_masters {
		@ $mol_mem
		masters(): readonly ($mol_view)[] {
			return this.$.$hyoo_crus_yard_masters.list()
				.map( url => this.Approved_server( url ));
		}

		@ $mol_mem
		submissions(): readonly ($mol_view)[] {
			return this.$.$hyoo_crus_yard_masters.submissions()
				.map( submission => this.Submitted_server( submission ));
		}

		@ $mol_mem
		approved_server_url( id: any ): string {
			return id;
		}

		@ $mol_mem
		submitted_server_url( id: any ): string {
			return id;
		}
	}
}
