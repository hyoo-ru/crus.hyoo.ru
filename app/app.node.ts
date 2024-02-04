namespace $ {

	@ $mol_rest_server.start
	export class $hyoo_crus_app extends $mol_rest_resource_fs {
		
		@ $mol_mem
		sync() {
			$mol_wire_solid()
			return $hyoo_crus_app_sync.make({})
		}
		
	}
	
	@ $mol_rest_server.start
	export class $hyoo_crus_app_sync extends $mol_rest_resource {
		
		_realm = new $hyoo_crus_realm
		
		@ $mol_mem
		_yard() {
			$mol_wire_solid()
			setTimeout( ()=> this._realm.yard().sync() )
			return this._realm.yard()
		}
		
		OPEN( msg: $mol_rest_message ) {
			this._yard().slaves.add( msg.port )
		}
		
		POST( msg: $mol_rest_message ) {
			console.log( 'POST ON' )
			this._yard().port_income( msg.port, msg.bin() )
			console.log( 'POST OFF' )
		}
		
		CLOSE( msg: $mol_rest_message ) {
			this._yard().slaves.delete( msg.port )
		}
		
	}
	
}
