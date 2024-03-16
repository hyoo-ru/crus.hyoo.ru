namespace $ {

	export class $hyoo_crus_app extends $mol_rest_resource_fs {
		
		@ $mol_mem
		_realm() {
			return new $hyoo_crus_realm
		}
		
		@ $mol_mem
		_yard() {
			setTimeout( ()=> this._sync() )
			return this._realm().yard()
		}
		
		@ $mol_mem
		_sync() {
			this._yard().sync()
		}
		
		OPEN( msg: $mol_rest_message ) {
			this._yard().slaves.add( msg.port )
		}
		
		POST( msg: $mol_rest_message ) {
			this._yard().port_income( msg.port, msg.bin() )
		}
		
		CLOSE( msg: $mol_rest_message ) {
			this._yard().slaves.delete( msg.port )
		}
		
	}
	
}
