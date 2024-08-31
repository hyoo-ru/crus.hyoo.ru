namespace $ {
	
	export class $hyoo_crus_stat_series extends $hyoo_crus_dict_to( $hyoo_crus_atom_real ) {
		
		@ $mol_action
		tick( key: bigint, val: number ) {
			this.key( key, null ).val( this.initial() + val )
		}
		
		_initial!: number
		@ $mol_action
		initial() {
			return this._initial
				?? ( this._initial = this.max() )
		}
		
		@ $mol_mem
		max() {
			return Math.max( ... this.values() )
		}
		
		@ $mol_mem
		values() {
			return this.nodes( $hyoo_crus_atom_real ).map( key => key.val()! )
		}
		
	}
	
}
