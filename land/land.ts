namespace $ {
	
	export class $hyoo_crowds_land extends $mol_object {
		
		@ $mol_mem
		realm() {
			return null as null | $hyoo_crowds_realm
		}
		
		lord() {
			return this.$.$hyoo_crowds_auth.current().lord()
		}
		
		area = new $mol_wire_dict< number /*numb*/, $hyoo_crowds_area >()
		
		base() {
			return this.Area( 0 ).Root( $hyoo_crowds_base )
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
		Area( numb: number ) {
		
			let area = this.area.get( numb )
			if( area ) return area
			
			area = $hyoo_crowds_area.make({
				land: $mol_const( this ),
				numb: $mol_const( numb ),
			})
			
			this.area.set( numb, area )
			return area
			
		}
		
		@ $mol_action
		Area_new( idea: number ) {
			return this.Area( this.numb_make( idea || undefined ) )
		}
		
		@ $mol_action
		numb_make( idea = Math.floor( Math.random() * 2**32 ) ) {
			for( let i = 0; i < 4096; ++i ) {
				idea = ( idea + 1  ) % 2**32
				if( !idea ) continue
				if( this.area.has( idea ) ) continue
				return idea
			}
			$mol_fail( new Error( `Too long numb generation` ) )
		}
		
	}
	
}
