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
		master_cursor( next = 0 ) {
			return next
		}
		
		@ $mol_mem
		master_current() {
			return this.$.$hyoo_crus_yard.masters[ this.master_cursor() ]
		}
		
		@ $mol_action
		master_next() {
			this.master_cursor( ( this.master_cursor() + 1 ) % this.$.$hyoo_crus_yard.masters.length )
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
		sync() {
			const realm = this.realm()
			for( const port of this.ports() ) {
				for( const land of this.port_lands( port ) ) {
					try {
						this.sync_port_land([ port, land ])
					} catch( error ) {
						$mol_fail_log( error )
					}
				}
			}
		}
		
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
		port_lands( port: $mol_rest_port ) {
			return new $mol_wire_set< $hyoo_crus_ref >()
		}
		
		@ $mol_action
		port_income( port: $mol_rest_port, msg: Uint8Array ) {
			
			const pack = $mol_wire_sync( $hyoo_crus_pack ).from( msg ) as $hyoo_crus_pack
			const parts = pack.parts()
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Gain Pack',
				port: $mol_key( port ),
				... parts,
			})
			
			const lands = this.port_lands( port )
			
			for( const land of Reflect.ownKeys( parts.lands ) as $hyoo_crus_ref[] ) {
				
				lands.add( land )
				
				const faces = parts.lands[ land ].faces
				let port_faces = this.face_port_land([ port, land ])
				
				if( port_faces ) port_faces.sync( faces )
				else this.face_port_land( [ port, land ], port_faces = faces )
			
				const units = parts.lands[ land ].units
				for( let unit of units ) {
					const unit2 = unit.narrow()
					if( unit2 instanceof $hyoo_crus_pass ) continue
					port_faces.time_max( unit2.peer(), unit2.time() )
				}
				
			}
			
			this.realm().apply_pack( pack )
		}
		
		@ $mol_mem_key
		sync_land( land: $hyoo_crus_ref ) {
			for( const port of this.ports() ) {
				this.port_lands( port ).add( land )
			}
		}
		
		@ $mol_mem_key
		sync_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ] ) {
			
			this.init_port_land([ port, land ])
			
			const faces = this.face_port_land([ port, land ])
			if( !faces ) return
			
			const Land = this.realm().Land( land )
			Land.saving()
			
			const parts = Land.delta_parts( faces )
			if( !parts ) return
			
			this.$.$mol_log3_rise({
				place: this,
				message: 'Send Unit',
				port: $mol_key( port ),
				... parts,
			})
			
			port.send_bin( $hyoo_crus_pack.make( parts ).asArray() )
			faces.sync( Land.faces )
			
		}
		
		@ $mol_mem_key
		init_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ] ) {
			// $mol_wire_solid()
			this.$.$mol_log3_rise({
				place: this,
				message: 'Send Face',
				port: $mol_key( port ),
				land: land,
				faces: this.realm().Land( land ).faces,
			})
			port.send_bin( this.realm().Land( land ).faces_pack().asArray() )
		}
		
		@ $mol_mem_key
		face_port_land(
			[ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ],
			next = null as null | $hyoo_crus_face_map
		) {
			// $mol_wire_solid()
			return next
		}
		
	}
}
