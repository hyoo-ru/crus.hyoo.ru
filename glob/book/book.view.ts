namespace $.$$ {
	export class $hyoo_crus_glob_book extends $.$hyoo_crus_glob_book {
		
		@ $mol_mem
		override spread_ids() {
			
			const spread = this.spread()
			const spread_land = $hyoo_crus_ref_land( $hyoo_crus_ref( spread ) )
			const lands_touched = [ ... this.$.$hyoo_crus_glob.lands_touched.values() ]
			const groups = $mol_array_groups( lands_touched, land => $hyoo_crus_ref_lord( land ).description! )
			
			const ids = [] as string[]
			
			for( const lord of Object.keys( groups ) ) {
				
				ids.push( lord )
				
				for( const land of groups[ lord ]! ) {
					if( land.description! !== lord ) ids.push( land.description! )
					if( land === spread_land ) ids.push( spread )
				}
				
			}
			
			return ids
		}
		
		override land( id: string ) {
			return this.$.$hyoo_crus_glob.Land( $hyoo_crus_ref_land( $hyoo_crus_ref( id ) ) )
		}
		
		override node( id: string ) {
			return this.$.$hyoo_crus_glob.Node( $hyoo_crus_ref( id ), $hyoo_crus_dict )
		}
		
		override spread_title( id: string ) {
			const ref = $hyoo_crus_ref( id )
			try {
				var title = this.$.$hyoo_crus_glob.Node( ref, $hyoo_crus_entity ).Title()?.val()
			} catch( error ) {
				$mol_fail_log( error )
			}
			const chunks = id.split( '_' )
			const suffix = title || ( chunks.length >= 4 ? $hyoo_crus_ref_head( ref ) : chunks.length === 3 ? $hyoo_crus_ref_area( ref ) : ref.description! )
			const prefix = [
				'',
				'',
				'🌎 ',
				'   🌄 ',
				'      🧩 ',
			][ chunks.length ]
			return prefix + suffix
		}
		
		override land_add( preset: $hyoo_crus_rank_preset ) {
			
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				[ this.param() ]: this.$.$hyoo_crus_glob.land_grab( preset ).ref().description!
			})
			
			return null
		}
		
		@ $mol_action
		override update( files: File[] ) {
			const glob = this.$.$hyoo_crus_glob
			for( const file of files ) {
				const dump = $mol_wire_sync( file ).arrayBuffer()
				const pack = new $hyoo_crus_pack( dump )
				glob.apply_pack( pack )
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
