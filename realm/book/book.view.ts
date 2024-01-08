namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().lords.values() ].flatMap(
				lord => [ ... lord.lands.values() ].map( land => land.ref().description || 'AAAAAAAA' )
			)
		}
		
		override land( id: string ) {
			return this.realm().Land( Symbol.for( id ) )
		}
		
		override spread_title( id: string ) {
			const title = this.land( id ).Data( $hyoo_crus_entity ).title()
			const suffix = title || ( id.length > 16 ? id.slice( 16 ) : id )
			return ( id.length > 16 ? '   🌍 ' : '👑 ' ) + suffix
		}
		
		override land_new() {
			this.spread( this.realm().home().Land_new( 0 ).ref().description )
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
