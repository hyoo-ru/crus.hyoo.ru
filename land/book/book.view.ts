namespace $.$$ {
	export class $hyoo_crowds_land_book extends $.$hyoo_crowds_land_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.land().area.keys() ].map( String )
		}
		
		override spread_title( numb: number ) {
			return Number( numb ).toString(36)
		}
		
		override area( id: string ) {
			return this.land().Area( Number( id ) )
		}
		
		override area_new() {
			this.spread( this.land().Area_new( 0 ).numb().toString() )
		}
		
	}
}
