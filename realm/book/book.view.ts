namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			const spread = this.spread()
			return [ ... this.realm().lords.values() ].flatMap( lord => {
				return [ ... lord.lands.values() ].flatMap( land => {
					const ref = land.ref().description || 'AAAAAAAA'
					return spread.startsWith( ref ) ? [ ref, spread ] : [ ref ]
				} )
			} )
		}
		
		override land( id: string ) {
			return this.realm().Land( Symbol.for( id.slice( 0, 24 ) ) )
		}
		
		override node( id: string ) {
			return this.realm().Node( Symbol.for( id ), $hyoo_crus_node )
		}
		
		override spread_title( id: string ) {
			const title = this.realm().Node( Symbol.for( id ), $hyoo_crus_entity ).title()
			const suffix = title || ( id.length > 24 ? id.slice( 24 ) : id.length > 16 ? id.slice( 16 ) : id )
			return ( id.length > 24 ? '      🧩 ' : id.length > 16 ? '   🌍 ' : '👑 ' ) + suffix
		}
		
		override land_new() {
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				[ this.param() ]: this.realm().home().Land_new( 0 ).ref().description!
			})
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
