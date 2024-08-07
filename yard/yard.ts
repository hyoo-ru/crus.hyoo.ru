namespace $ {
	/** Glob synchronizer */
	export class $hyoo_crus_yard extends $mol_object {
		
		/** Whole global graph database which contains Lands */
		@ $mol_mem
		glob() {
			return null! as $hyoo_crus_glob
		}
		
		lands_news = new $mol_wire_set< $hyoo_crus_ref >()
		
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
		
		@ $mol_mem
		master() {
			
			this.reconnects()
			
			const link = this.master_current()
			if( !link ) return null
			
			const socket = new $mol_dom_context.WebSocket( link.replace( /^http/, 'ws' ) )
			socket.binaryType = 'arraybuffer'
			const port = $mol_rest_port_ws_std.make({ socket })
			
			socket.onmessage = async( event )=> {
				
				if( event.data instanceof ArrayBuffer ) {
					if( !event.data.byteLength ) return
					await $mol_wire_async( this ).port_income( port, new Uint8Array( event.data ) )
				} else {
					
					this.$.$mol_log3_fail({	
						place: this,
						message: 'Wrong data',
						data: event.data
					})
					
				}
				
			}
			
			let interval: any

			socket.onclose = ()=> {
				clearInterval( interval )
				setTimeout( ()=> this.reconnects( null ), 1000 )
			}
			
			Object.assign( socket, {
				destructor: ()=> {
					socket.onclose = ()=> {}
					clearInterval( interval )
					socket.close()
				}
			} )
			
			return new Promise< $mol_rest_port >( ( done, fail )=> {
				
				socket.onopen = ()=> {
					
					this.$.$mol_log3_come({
						place: this,
						message: 'Connected',
						port: $mol_key( port ),
						server: link,
					})
					
					interval = setInterval( ()=> socket.send( new Uint8Array ), 30000 )
					
					done( port )
				}
				
				socket.onerror = ()=> {
					
					socket.onclose = event => {
						fail( new Error( `Master (${link}) is unavailable (${ event.code })` ) )
						clearInterval( interval )
						interval = setTimeout( ()=> {
							this.master_next()
							this.reconnects( null )
						}, 1000 )
					}
					
				}
				
			} ) as any as $mol_rest_port
			
		}
		
		slaves = new $mol_wire_set< $mol_rest_port >()
		
		@ $mol_mem
		sync() {
			this.sync_news()
			this.sync_port()
		}
		
		@ $mol_mem
		sync_news() {
			
			const glob = this.$.$hyoo_crus_glob
			const lands = [ ... this.lands_news ].map( ref =>  glob.Land( ref ) )
			
			try {
				for( const port of this.ports() ) {
					for( const land of lands ) {
						this.sync_port_land([ port, land.ref() ])
					}
				}
				for( const land of lands ) land.saving()
				this.lands_news.clear()
			} catch( error ) {
				$mol_fail_log( error )
			}
			
		}
		
		@ $mol_mem
		sync_port() {
			for( const port of this.ports() ) this.sync_port_lands( port )
		}
		
		@ $mol_mem_key
		sync_port_lands( port: $mol_rest_port ) {
			for( const land of this.port_lands_active( port ) ) {
				this.sync_port_land([ port, land ])
			}
		}
		
		@ $mol_mem
		ports() {
			return [ ... this.masters(), ... this.slaves ]
		}
		
		@ $mol_mem
		masters() {
			try {
				return [ this.master() ].filter( $mol_guard_defined )
			} catch( error ) {
				$mol_fail_log( error )
				return []
			}
		}
		
		@ $mol_mem_key
		port_lands_active( port: $mol_rest_port ) {
			return new $mol_wire_set< $hyoo_crus_ref >()
		}
		
		@ $mol_mem_key
		port_lands_passive( port: $mol_rest_port ) {
			return new $mol_wire_set< $hyoo_crus_ref >()
		}
		
		@ $mol_action
		port_income( port: $mol_rest_port, msg: Uint8Array ) {
			
			const pack = $mol_wire_sync( $hyoo_crus_pack ).from( msg ) as $hyoo_crus_pack
			const parts =  $mol_wire_sync( pack ).parts()
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Gain Pack',
				port: $mol_key( port ),
				lands: parts.lands,
				rocks: parts.rocks.length,
			})
			
			forget: {
				
				if( parts.rocks.length ) break forget
				
				const lands = Object.getOwnPropertySymbols( parts.lands ) as any as readonly $hyoo_crus_ref[]
				for( const land of lands ) {
					
					if( parts.lands[ land ].units.length ) break forget
					if( parts.lands[ land ].faces.size ) break forget
					if( !this.port_lands_active( port ).has( land ) ) break forget
					
					this.port_lands_active( port ).delete( land )
					return
					
				}
				
			}
			
			this.face_port_sync( port, parts.lands )
			this.$.$hyoo_crus_glob.apply_parts( parts.lands, parts.rocks )
			
		}
		
		@ $mol_action
		face_port_sync(
			port: $mol_rest_port,
			income: Record< $hyoo_crus_ref, {
				faces: $hyoo_crus_face_map
				units: $hyoo_crus_unit[]
			}>, 
		) {
			
			const actives = this.port_lands_active( port )
			const passives = this.port_lands_passive( port )
			
			for( const land of Reflect.ownKeys( income ) as $hyoo_crus_ref[] ) {
				
				if( !passives.has( land ) ) actives.add( land )
				
				const faces = income[ land ].faces
				let port_faces = this.face_port_land([ port, land ])
				
				if( !port_faces ) this.face_port_land(
					[ port, land ],
					port_faces = $mol_mem_cached( ()=> this.face_port_land([ port, land ]) )
						|| new $hyoo_crus_face_map,
				)
				port_faces.sync( faces )
			
				const units = income[ land ].units
				for( let unit of units ) {
					const unit2 = unit.narrow()
					if( unit2 instanceof $hyoo_crus_pass ) continue
					port_faces.time_max( unit2.peer(), unit2.time() )
				}
				
			}
			
		}
		
		@ $mol_mem_key
		sync_land( land: $hyoo_crus_ref ) {
			for( const port of this.masters() ) {
				this.port_lands_passive( port ).add( land )
				this.sync_port_land([ port, land ])
			}
			this.sync()
		}
		
		@ $mol_action
		forget_land( land: $hyoo_crus_land ) {
			
			const faces = new $hyoo_crus_face_map
			faces.total = land.faces.total
			
			const pack = $hyoo_crus_pack.make({
				lands: { [ land.ref() ]: { faces, units: [] } },
				rocks:[],
			}).asArray()
			
			for( const port of this.ports() ) {
				
				if( !this.port_lands_passive( port ).has( land.ref() ) ) continue
				this.port_lands_passive( port ).delete( land.ref() )
				
				this.$.$mol_log3_rise({
					place: this,
					message: 'Forget Land',
					port: $mol_key( port ),
					land: land.ref(),
				})
				
				port.send_bin( pack )
				
			}
			
		}
		
		@ $mol_mem_key
		sync_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ] ) {
			
			try {
			
				this.init_port_land([ port, land ])
				
				const faces = this.face_port_land([ port, land ])
				if( !faces ) return
				
				const Land = this.$.$hyoo_crus_glob.Land( land )
				Land.saving()
				
				const parts = Land.delta_parts( faces )
				if( !parts ) return
				
				this.$.$mol_log3_rise({
					place: this,
					message: 'Send Unit',
					port: $mol_key( port ),
					lands: parts.lands,
					rocks: parts.rocks.length,
				})
				
				port.send_bin( $hyoo_crus_pack.make( parts ).asArray() )
				faces.sync( Land.faces )
			
			} catch( error ) {
				$mol_fail_log( error )
			}
			
		}
		
		@ $mol_mem_key
		init_port_land( [ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ] ) {
			// $mol_wire_solid() 
			const Land = this.$.$hyoo_crus_glob.Land( land )
			Land.loading()
			this.$.$mol_log3_rise({
				place: this,
				message: 'Send Face',
				port: $mol_key( port ),
				land: land,
				faces: Land.faces,
			})
			port.send_bin( Land.faces_pack().asArray() )
		}
		
		@ $mol_mem_key
		face_port_land(
			[ port, land ]: [ $mol_rest_port, $hyoo_crus_ref ],
			next = null as null | $hyoo_crus_face_map
		) {
			$mol_wire_solid()
			return next
		}
		
	}
}
