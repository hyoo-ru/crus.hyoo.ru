namespace $.$$ {
	export class $hyoo_crus_sand_dump extends $.$hyoo_crus_sand_dump {
		
		value() {
			return this.land().sand_decode( this.sand() )
		}
		
		@ $mol_mem
		sub() {
			const value = this.value()
			if( typeof value === 'symbol' ) return [ this.Ref() ]
			return [ this.Other() ]
		}
		
		@ $mol_mem
		title() {
			const ref = this.value() as $hyoo_crus_ref
			return this.$.$hyoo_crus_realm.Node( ref , $hyoo_crus_flex_thing ).Title()?.val() || ref?.description!
		}
		
		@ $mol_mem
		arg() {
			const ref = ( this.value() as $hyoo_crus_ref ).description!
			return { ref }
		}
		
	}
}
