namespace $.$$ {
	export class $hyoo_crus_glob_book extends $.$hyoo_crus_glob_book {
		
		@ $mol_mem
		override spread_ids() {
			
			const spread = this.spread()
			const spread_land = new $hyoo_crus_link( spread ).land().str
			const lands_touched = [ ... this.$.$hyoo_crus_glob.lands_touched.values() ]
			const groups = $mol_array_groups( lands_touched, land => land )
			
			const ids = [] as string[]
			
			for( const lord of Object.keys( groups ) ) {
				
				ids.push( lord )
				
				for( const land of groups[ lord ]! ) {
					if( land !== lord ) ids.push( land )
					if( land === spread_land ) ids.push( spread )
				}
				
			}
			
			return ids
		}
		
		override land( id: string ) {
			return this.$.$hyoo_crus_glob.Land( new $hyoo_crus_link( id ).land() )
		}
		
		override node( id: string ) {
			return this.$.$hyoo_crus_glob.Node( new $hyoo_crus_link( id ), $hyoo_crus_dict )
		}
		
		override spread_title( id: string ) {
			const link = new $hyoo_crus_link( id )
			try {
				var title = this.$.$hyoo_crus_glob.Node( link, $hyoo_crus_entity ).Title()?.val()
			} catch( error ) {
				$mol_fail_log( error )
			}
			const chunks = id.split( '_' )
			const suffix = title || ( chunks.length >= 4 ? link.head().str : chunks.length === 3 ? link.area() : link.str )
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
				[ this.param() ]: this.$.$hyoo_crus_glob.land_grab( preset ).link().str
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
