namespace $ {
	export class $hyoo_crus_base extends $hyoo_crus_dict {
		
		@ $mol_mem
		title( next?: string ) {
			return this.dive( 'title', $hyoo_crus_reg, next )?.value_str( next ) ?? ''
		}
		
		@ $mol_mem
		selection( next?: string ) {
			return this.dive( 'selection', $hyoo_crus_reg, next )?.value_str( next ) ?? ''
		}
		
		@ $mol_mem
		profiles() {
			return this.dive( 'profiles', $hyoo_crus_dict )?.keys() ?? []
		}
		
		@ $mol_mem_key
		Profile( app: string, auto?: any ) {
			return this.dive( 'profiles', $hyoo_crus_dict, auto )
				?.dive( app, $hyoo_crus_reg, auto )
				?.yoke( auto === undefined ? undefined : $hyoo_crus_rank_public )
				?? null
		}
		
	}
}
