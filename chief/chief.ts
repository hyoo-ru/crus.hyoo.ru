namespace $ {
	export class $hyoo_crowds_chief extends $hyoo_crowds_dict {
		
		title( next?: string ) {
			return this.dive( 'title', $hyoo_crowds_reg ).value_str( next )
		}
		
		selection( next?: readonly( readonly[ number, number ] )[] ) {
			return ( this.dive( 'selection', $hyoo_crowds_reg ).value( next ) ?? [ [ 0, 0 ], [ 0, 0 ] ] ) as readonly( readonly[ number, number ])[]
		}
		
		profiles() {
			return this.dive( 'profiles', $hyoo_crowds_dict ).keys()
		}
		
		Profile( app: string ) {
			return this.dive( 'profiles', $hyoo_crowds_dict ).dive( app, $hyoo_crowds_reg ).yoke( app )
		}
		
	}
}
