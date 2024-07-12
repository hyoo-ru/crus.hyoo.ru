namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			const spread = this.spread()
			const spread_land = $hyoo_crus_ref_land( $hyoo_crus_ref( spread ) )
			return [ ... this.$.$hyoo_crus_realm.lands_touched.values() ].flatMap( land => {
				return land === spread_land
					? [ land.description!, spread ]
					: [ land.description! ]
			} )
		}
		
		override land( id: string ) {
			return this.$.$hyoo_crus_realm.Land( $hyoo_crus_ref_land( $hyoo_crus_ref( id ) ) )
		}
		
		override node( id: string ) {
			return this.$.$hyoo_crus_realm.Node( $hyoo_crus_ref( id ), $hyoo_crus_dict )
		}
		
		override spread_title( id: string ) {
			const ref = $hyoo_crus_ref( id )
			try {
				var title = this.$.$hyoo_crus_realm.Node( ref, $hyoo_crus_entity ).Title()?.val()
			} catch( error ) {
				$mol_fail_log( error )
			}
			const chunks = id.split( '_' )
			const suffix = title || ( chunks.length >= 3 ? $hyoo_crus_ref_head( ref ) : ref.description! )
			const prefix = [
				'',
				'',
				'🌍 ',
				'   🧩 ',
			][ chunks.length ]
			return prefix + suffix
		}
		
		override land_add( preset: $hyoo_crus_rank_preset ) {
			
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				[ this.param() ]: this.$.$hyoo_crus_realm.land_grab( preset ).ref().description!
			})
			
			return null
		}
		
		@ $mol_action
		override update( files: File[] ) {
			const realm = this.$.$hyoo_crus_realm
			for( const file of files ) {
				const dump = $mol_wire_sync( file ).arrayBuffer()
				const pack = new $hyoo_crus_pack( dump )
				realm.apply_pack( pack )
			}
			return []
		}
		
		override async wipe() {
			const yard = await this.$.$mol_db( '$hyoo_crus_yard' )
			const mine = await this.$.$mol_db( '$hyoo_crus_mine' )
			yard.kill()
			mine.kill()
			location.reload()
		}
		
	}
}
