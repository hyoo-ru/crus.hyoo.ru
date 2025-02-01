namespace $.$$ {
	export class $hyoo_crus_sand_dump extends $.$hyoo_crus_sand_dump {
		
		value() {
			return this.land().sand_decode( this.sand() )
		}
		
		@ $mol_mem
		sub() {
			const value = this.value()
			if( value instanceof $hyoo_crus_link ) return [ this.Ref() ]
			return [ this.Other() ]
		}
		
		@ $mol_mem
		title() {
			const link = this.value() as $hyoo_crus_link
			return this.$.$hyoo_crus_glob.Node( link , $hyoo_crus_flex_thing ).Title()?.val() || link?.str
		}
		
		@ $mol_mem
		arg() {
			const link = ( this.value() as $hyoo_crus_link ).str
			return { link }
		}
		
	}
}
