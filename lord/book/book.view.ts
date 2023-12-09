namespace $.$$ {
	export class $hyoo_cras_lord_book extends $.$hyoo_cras_lord_book {
		
		override menu_title() {
			return '👑Lord ' + this.lord().slug() 
		}
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.lord().lands.values() ].map( land => land.slug() || 'AAAAAAAA' )
		}
		
		override spread_title( id: string ) {
			return this.land( id ).slug() || 'Home'
		}
		
		override land( id: string ) {
			return this.lord().Land( $hyoo_cras_ref.from( this.lord().ref() + id ).land() )
		}
		
		override land_new() {
			this.spread( this.lord().Land_new( 0 ).slug() )
		}
		
	}
}
