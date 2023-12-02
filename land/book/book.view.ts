namespace $.$$ {
	export class $hyoo_crowds_land_book extends $.$hyoo_crowds_land_book {
		
		override menu_title() {
			return 'Land ' + this.land().ref() 
		}
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.land().area.values() ].map( area => area.ref().toString() )
		}
		
		override spread_title( id: string ) {
			return this.area( id ).slug()
		}
		
		override area( id: string ) {
			return this.land().Area( $hyoo_crowds_ref.from( id ).numb() )
		}
		
		override area_new() {
			this.spread( this.land().Area_new( 0 ).ref().toString() )
		}
		
	}
}
