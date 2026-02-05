namespace $ {
	export class $hyoo_crus_yard_masters extends $hyoo_crus_dict.with({
		Urls: $hyoo_crus_list_str,
		Submissions: $hyoo_crus_atom_ref_to( () => $hyoo_crus_list_str )
	}) {
		@ $mol_mem
		static masters_land() {
			const link = this.$.$hyoo_crus_ref( this.$.$mol_state_arg.value( "masters_link" ) || "????????_????????" );

			return this.$.$hyoo_crus_glob.Node( link, this.$.$hyoo_crus_yard_masters );
		}

		@ $mol_mem
		static submissions_land() {
			const link = this.$.$hyoo_crus_ref( this.$.$mol_state_arg.value( "submissions_link" ) || "????????_????????" );
			const land = this.$.$hyoo_crus_glob.Land( this.$.$hyoo_crus_ref_land( link ));

			return this.masters_land().Submissions( land )?.ensure( land ) ?? null;
		}

		@ $mol_action
		static append( url: string ) {
			this.reject( url );
			this.masters_land().Urls()?.add( url );
		}

		@ $mol_action
		static delete( url: string ) {
			const seat = this.list().indexOf( url );
			this.masters_land()?.wipe( seat );
		}

		@ $mol_mem
		static list(): string[] {
			return this.masters_land().Urls( null )?.items() as string[] ?? [];
		}

		@ $mol_action
		static submit( url: string ) {
			this.submissions_land()?.add( url );
		}

		@ $mol_action
		static reject( url: string ) {
			const seat = this.submissions().indexOf( url );
			this.submissions_land()?.wipe( seat );
		}

		@ $mol_mem
		static submissions(): string[] {
			return this.submissions_land()?.items() as string[] ?? [];
		}
	}
}
