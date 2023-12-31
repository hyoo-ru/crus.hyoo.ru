namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().lords.values() ].flatMap(
				lord => [ ... lord.lands.values() ].map( land => land.guid() || 'AAAAAAAA' )
			)
		}
		
		override land( id: string ) {
			return this.realm().Land( id )
		}
		
		override spread_title( id: string ) {
			return id.length > 16 ? '   🌍 ' + id.slice( 16 ) : '👑 ' + id
		}
		
		override land_new() {
			this.spread( this.realm().home().Land_new( 0 ).guid() )
		}
		
	}
}
