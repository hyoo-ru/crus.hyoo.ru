namespace $.$$ {
	export class $hyoo_crowds_lord_book extends $.$hyoo_crowds_lord_book {
		
		override menu_title() {
			return 'Lord ' + this.lord().ref() 
		}
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.lord().lands.values() ].map( land => land.ref().toString() )
		}
		
		override spread_title( id: string ) {
			return this.land( id ).slug()
		}
		
		override land( id: string ) {
			return this.lord().Land( $hyoo_crowds_ref.from( id ).numb() )
		}
		
		override land_new() {
			this.spread( this.lord().Land_new( 0 ).ref().toString() )
		}
		
	}
}
