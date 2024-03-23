namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			const spread = this.spread()
			const spread_land = $hyoo_crus_ref_land( $hyoo_crus_ref( spread ) )
			return [ ... new Set([ ... this.realm().lands.values() ].flatMap( land => {
				return land.ref() === spread_land
					? [ land.ref().description!, spread]
					: [ land.ref().description! ]
			} ) ) ]
		}
		
		override land( id: string ) {
			return this.realm().Land( $hyoo_crus_ref_land( $hyoo_crus_ref( id ) ) )
		}
		
		override node( id: string ) {
			return this.realm().Node( $hyoo_crus_ref( id ), $hyoo_crus_node )
		}
		
		override spread_title( id: string ) {
			const ref = $hyoo_crus_ref( id )
			const title = this.realm().Node( ref, $hyoo_crus_entity ).title()
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
		
		override land_add( rights?: string ) {
			
			const preset = ( {
				private: $hyoo_crus_rank_private,
				public: $hyoo_crus_rank_public,
				lobby: $hyoo_crus_rank_lobby,
				orgy: $hyoo_crus_rank_orgy,
			} as Record< string, $hyoo_crus_rank_preset > )[ rights as any ]
			
			if( !preset ) return ''
			
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				[ this.param() ]: this.realm().land_grab( preset ).ref().description!
			})
			
			return ''
		}
		
		@ $mol_action
		override update( files: File[] ) {
			const realm = this.realm()
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
