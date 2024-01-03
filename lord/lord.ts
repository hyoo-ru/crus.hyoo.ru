namespace $ {
	
	export class $hyoo_crus_lord extends $mol_object {
		
		realm() {
			return null as null | $hyoo_crus_realm
		}
		
		numb() {
			return this.$.$hyoo_crus_auth.current().lord()
		}
		
		lands = new $mol_wire_dict< string /*numb*/, $hyoo_crus_land >()
		
		base() {
			return this.Land( '' ).Root( $hyoo_crus_base )
		}
		
		guid() {
			return this.numb()
		}
		
		toString() {
			return this.numb()
		}
		
		@ $mol_mem_key
		Land( numb: string ): $hyoo_crus_land {
			
			if( numb === 'AAAAAAAA' ) return this.Land( '' )
		
			let land = this.lands.get( numb )
			if( land ) return land
			
			land = $hyoo_crus_land.make({
				lord: $mol_const( this ),
				numb: $mol_const( numb ),
			})
			
			this.lands.set( numb, land )
			return land
			
		}
		
		@ $mol_action
		Land_new( idea: number ) {
			return this.Land( this.numb_make( idea || undefined ) )
		}
		
		Profile< Node extends typeof $hyoo_crus_node >( app: string, Node: Node ) {
			return this.base().Profile( app ).Root( Node )
		}
		
		@ $mol_action
		numb_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			for( let i = 0; i < 4096; ++i ) {
				idea = ( idea + 1 ) % 2**48
				if( !idea ) continue
				const idea_str = $mol_base64_ae_encode( new Uint8Array( new BigUint64Array([ BigInt( idea ) ]).buffer, 0, 6 ) )
				if( this.lands.has( idea_str ) ) continue
				return idea_str
			}
			$mol_fail( new Error( `Too long numb generation` ) )
		}
		
	}
	
}
