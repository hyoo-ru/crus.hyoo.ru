namespace $ {
	
	export class $hyoo_crowds_lord extends $mol_object {
		
		@ $mol_mem
		realm() {
			return null as null | $hyoo_crowds_realm
		}
		
		numb() {
			return this.$.$hyoo_crowds_auth.current().lord()
		}
		
		lands = new $mol_wire_dict< number /*numb*/, $hyoo_crowds_land >()
		
		base() {
			return this.Land( 0 ).Root( $hyoo_crowds_base )
		}
		
		ref() {
			return this.base().ref()
		}
		
		toString() {
			return this.ref().toString()
		}
		
		slug() {
			return this.ref().toString()
		}
		
		@ $mol_mem_key
		Land( numb: number ) {
		
			let land = this.lands.get( numb )
			if( land ) return land
			
			land = $hyoo_crowds_land.make({
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
		
		@ $mol_action
		numb_make( idea = Math.floor( Math.random() * 2**32 ) ) {
			for( let i = 0; i < 4096; ++i ) {
				idea = ( idea + 1  ) % 2**32
				if( !idea ) continue
				if( this.lands.has( idea ) ) continue
				return idea
			}
			$mol_fail( new Error( `Too long numb generation` ) )
		}
		
	}
	
}
