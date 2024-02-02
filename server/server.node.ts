namespace $ {

	@ $mol_rest_server.start
	export class $hyoo_crus_server extends $mol_rest_resource {
		
		@ $mol_mem
		static() {
			return $mol_rest_resource.make({})
		}
		
		@ $mol_mem
		sync() {
			$mol_wire_solid()
			return $hyoo_crus_server_sync.make({})
		}
		
	}
	
	@ $mol_rest_server.start
	export class $hyoo_crus_server_sync extends $mol_rest_resource {
		
		_realm = new $hyoo_crus_realm
		
		@ $mol_mem
		_yard() {
			$mol_wire_solid()
			this._realm.yard().sync()
			return this._realm.yard()
		}
		
		OPEN( msg: $mol_rest_message ) {
			this._yard().slaves.add( msg.port )
		}
		
		POST( msg: $mol_rest_message ) {
			this._yard().port_income( msg.port, msg.bin() )
		}
		
		CLOSE( msg: $mol_rest_message ) {
			this._realm.yard().slaves.delete( msg.port )
		}
		
	}
	
}
