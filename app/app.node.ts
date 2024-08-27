namespace $ {

	export class $hyoo_crus_app_node extends $mol_rest_resource_fs {
		
		@ $mol_mem
		_yard() {
			$mol_wire_solid()
			setTimeout( ()=> this._sync() )
			return this.$.$hyoo_crus_glob.yard()
		}
		
		@ $mol_mem
		_sync() {
			this._yard().sync()
		}
		
		@ $mol_memo.method
		ref() {
			return new $hyoo_crus_app_node_ref
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
		
		_auto() {
			this._stat_update()
		}
		
		@ $mol_mem
		_stat_update() {
			const home = this.$.$hyoo_crus_glob.home( $hyoo_crus_app_home )
			const stat = home.stat( null )!
			home.init()
			stat.tick()
		}
		
	}
	
	export class $hyoo_crus_app_node_ref extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {
			msg.reply( this.$.$hyoo_crus_auth.current().lord().description! )
		}
		
	}
	
}
