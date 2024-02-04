namespace $ {
	export class $hyoo_crus_yard extends $mol_object {
		
		@ $mol_mem
		realm() {
			return null! as $hyoo_crus_realm
		}
		
		persisted = new WeakSet< $hyoo_crus_unit >()
		
		load( land: $hyoo_crus_land ) {
			return [] as readonly $hyoo_crus_unit[]
		}
		
		async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {}
		
		static masters = [] as string[]
		
		@ $mol_mem
		master_cursor( next = 0, force?: true ) {
			return next
		}
		
		@ $mol_mem
		master_current() {
			return this.$.$hyoo_crus_yard.masters[ this.master_cursor() ]
		}
		
		@ $mol_action
		master_next() {
			this.master_cursor( ( this.master_cursor() + 1 ) % this.$.$hyoo_crus_yard.masters.length, !!'force' )
		}
		
		@ $mol_mem
		reconnects( reset?: null ): number {
			return ( $mol_wire_probe( ()=> this.reconnects() ) ?? 0 ) + 1
		}
		
		master() {
			return null as null | $mol_rest_port
		}
		
		slaves = new $mol_wire_set< $mol_rest_port >()
		
		@ $mol_mem
		ports() {
			try {
				return [ this.master(), ... this.slaves ].filter( $mol_guard_defined )
			} catch( error ) {
				$mol_fail_log( error )
				return [ ... this.slaves ]
			}
		}
		
		@ $mol_mem_key
		port_lands( port: $mol_rest_port, next = [] as typeof $hyoo_crus_ref.Value[] ) {
			return next
		}
		
		@ $mol_mem
		sync() {
			const realm = this.realm()
			for( const port of this.ports() ) {
				for( const land of this.port_lands( port ) ) {
					try {
						this.sync_port_land([ port, realm.Land( land ) ])
					} catch( error ) {
						$mol_fail_log( error )
					}
				}
			}
		}
		
		@ $mol_action
		port_income( port: $mol_rest_port, msg: Uint8Array ) {
			
			const pack = $mol_wire_sync( $hyoo_crus_pack ).from( msg ) as $hyoo_crus_pack
			const faces = pack.parts().faces
			const land_refs = Reflect.ownKeys( faces ) as typeof $hyoo_crus_ref.Value[]
			
			this.port_lands( port, [ ... new Set([
				... this.port_lands( port ),
				... land_refs,
			]) ] )
			
			for( const land_ref of land_refs ) {
				
				const land = this.realm().Land( land_ref )
				const port_face = this.face_port_land([ port, land ])
				
				if( port_face ) port_face.sync( faces[ land_ref ] )
				else this.face_port_land( [ port, land ], faces[ land_ref ] )
			
			}
			
			this.realm().apply_pack( pack )
		}
		
		@ $mol_mem_key
		sync_land( land: $hyoo_crus_land ) {
			for( const port of this.ports() ?? [] ) {
				try {
					this.sync_port_land([ port, land ])
				} catch( error ) {
					$mol_fail_log( error )
				}
			}
		}
		
		@ $mol_mem_key
		sync_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_land ] ) {
			
			this.init_port_land([ port, land ])
			
			const faces = this.face_port_land([ port, land ])
			if( !faces ) return
			
			const delta = land.delta_pack( faces )
			if( !delta ) return
			
			port.send_bin( delta.asArray() )
			faces.sync( land.face )
			
		}
		
		@ $mol_mem_key
		init_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_land ] ) {
			port.send_bin( land.faces_pack().asArray() )
		}
		
		@ $mol_mem_key
		face_port_land(
			[ port, land ]: [ $mol_rest_port, $hyoo_crus_land ],
			next = null as null | $hyoo_crus_face_map
		) {
			$mol_wire_solid()
			return next
		}
		
	}
}
