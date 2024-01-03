namespace $.$$ {
	export class $hyoo_crus_lord_book extends $.$hyoo_crus_lord_book {
		
		override menu_title() {
			return '👑Lord ' + this.lord().ref().description
		}
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.lord().lands.values() ].map( land => land.numb() || 'AAAAAAAA' )
		}
		
		override spread_title( id: string ) {
			return this.land( id ).numb() || 'Home'
		}
		
		override land( id: string ) {
			return this.lord().Land( id )
		}
		
		override land_new() {
			this.spread( this.lord().Land_new( 0 ).numb() )
		}
		
	}
}
