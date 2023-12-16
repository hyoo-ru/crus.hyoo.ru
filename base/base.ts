namespace $ {
	export class $hyoo_cras_base extends $hyoo_cras_dict {
		
		@ $mol_mem
		title( next?: string ) {
			return this.dive( 'title', $hyoo_cras_reg ).value_str( next )
		}
		
		@ $mol_mem
		selection( next?: readonly( readonly[ number, number ] )[] ) {
			return ( this.dive( 'selection', $hyoo_cras_reg ).value_vary( next ) ?? [ [ 0, 0 ], [ 0, 0 ] ] ) as readonly( readonly[ number, number ])[]
		}
		
		@ $mol_mem
		profiles() {
			return this.dive( 'profiles', $hyoo_cras_dict ).keys()
		}
		
		@ $mol_mem_key
		Profile( app: string ) {
			return this.dive( 'profiles', $hyoo_cras_dict ).dive( app, $hyoo_cras_reg ).yoke( app )
		}
		
	}
}
