namespace $.$$ {
	export class $hyoo_crus_gist_dump extends $.$hyoo_crus_gist_dump {
		
		value() {
			return this.land().gist_decode( this.gist() )
		}
		
		@ $mol_mem
		Sub() {
			const value = this.value()
			if( typeof value === 'symbol' ) return this.Ref()
			return this.Other()
		}
		
		@ $mol_mem
		title() {
			const ref = this.value() as $hyoo_crus_ref
			return this.land().realm()!.Node( ref , $hyoo_crus_flex_thing ).title() || ref?.description!
		}
		
		@ $mol_mem
		arg() {
			const ref = ( this.value() as $hyoo_crus_ref ).description!
			return { ref }
		}
		
	}
}
