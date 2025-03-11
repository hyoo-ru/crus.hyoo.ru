namespace $ {
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export type $hyoo_crus_pack_parts = [ string, $hyoo_crus_pack_part ][]
	
	export class $hyoo_crus_pack_part extends Object {
		
		constructor(
			public gifts = [] as $hyoo_crus_gift[],
			public sands = [] as $hyoo_crus_sand[],
			public faces = new $hyoo_crus_face_map,
		) {
			super()
		}
		
		static from( units: $hyoo_crus_unit[], faces = new $hyoo_crus_face_map ) {
			
			const gifts = [] as $hyoo_crus_gift[]
			const sands = [] as $hyoo_crus_sand[]
			
			for( const unit of units ) unit.choose({
				gift: gift => gifts.push( gift ),
				sand: sand => sands.push( sand ),
			})
			
			return new this( gifts, sands, faces )
		}
		
		get units() {
			return [ ... this.gifts, ... this.sands ]
		}
		
		*[ Symbol.iterator ]() {
			return {
				gifts: this.gifts,
				sands: this.sands,
				faces: this.faces,
			}
		}
		
	}
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export class $hyoo_crus_pack extends $mol_buffer {
		
		toBlob() {
			return new Blob( [ this ], { type: 'application/vnd.hyoo_crus_pack.v1' } )
		}
		
		parts( land = null as $hyoo_crus_link | null ) {
			
			const parts = new Map< string, $hyoo_crus_pack_part >
			if( land ) parts.set( land.str, new $hyoo_crus_pack_part )
			
			const balls = new Map< string, Uint8Array< ArrayBuffer > | null >()
			const passes = new Map< string, $hyoo_crus_auth_pass >()
			
			const buf = this.asArray()
			
			for( let offset = 0; offset < this.byteLength; ) {
				
				const kind = this.uint8( offset )
				if( kind >>> 3 ) {
					
					if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
					
					const sand = $hyoo_crus_sand.from(
						buf.slice( offset, offset += $hyoo_crus_unit.size )
					)
					
					parts.get( land.str )!.sands.push( sand )
			
					continue
				}
					
				switch( kind ) {
					
					case $hyoo_crus_slot_kind.free: {
						offset += $hyoo_crus_unit.size
						continue
					}
					
					case $hyoo_crus_slot_kind.buck: {
						offset += 128
						continue
					}
					
					case $hyoo_crus_slot_kind.land: {
						
						const faces = new $hyoo_crus_face_map
						// faces.face = this.uint32( offset ) >> 8 // Size?
						
						land = $hyoo_crus_link.from_bin(
							new Uint8Array( buf.buffer, buf.byteOffset + offset + 4, 18 )
						)
						
						const count = this.uint16( offset + 22 ) // Vers
						
						offset += 24
						
						// Faces
						for( let i = 0; i < count; ++i ) {
							
							const peer = $hyoo_crus_link.from_bin(
								new Uint8Array( buf.buffer, buf.byteOffset + offset, 6 )
							)
							
							const tick = this.uint16( offset + 6 )
							const time = this.uint32( offset + 8 )
							const mass = this.uint16( offset + 12 )
							
							faces.peer_time( peer.str, time, tick )
							faces.peer_mass( peer.str, mass )
							
							offset += $hyoo_crus_face_size
							
						}
						offset = Math.ceil( offset / 8 ) * 8
						
						parts.set( land.str, new $hyoo_crus_pack_part( [], [], faces ) )
						
						continue
					}
					
					case $hyoo_crus_slot_kind.gift: {
						
						if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
						
						const unit = new $hyoo_crus_gift(
							buf.slice( offset, offset += $hyoo_crus_unit.size ).buffer
						)
						
						parts.get( land.str )!.gifts.push( unit )
						
						continue
					}
					
					case $hyoo_crus_slot_kind.ball: {
						
						const size = this.uint32( offset ) >> 8
						if( size === 0 ) {
							
							const hash = $hyoo_crus_link.from_bin( buf.slice( offset + 6, offset + 6 + 18 ) )
							balls.set( hash.str, null )
							offset += 24
							
						} else {
							
							const ball = buf.slice( offset + 4, offset + 4 + size )
							
							const hash = $hyoo_crus_link.hash_bin( ball )
							balls.set( hash.str, ball )
							
							const pass = new $hyoo_crus_auth_pass( ball.buffer )
							passes.set( hash.peer().str, pass )
							
							offset += Math.ceil( size / 8 + .5 ) * 8
						
						}
						continue
						
					}
					
					default: $mol_fail( new Error( `Unknown CRUS Pack Part (${ kind.toString(2) }) at (${ offset.toString(16) })` ) )
					
				}
				
			}
			
			// Revive bins from Hashes and Balls
			for( const [,land] of parts ) {
				
				land.gifts = land.gifts.filter( gift => {
					
					const pass = passes.get( gift.pass_link().str )
					if( !pass ) return false
					gift.pass( pass )
					
					const mate = passes.get( gift.mate_link().str )
					if( !mate ) return false
					gift.mate( mate )
					
					return true
				} )
				
				land.sands = land.sands.filter( sand => {
					
					const pass = passes.get( sand.pass_link().str )
					if( !pass ) return false
					sand.pass( pass )
					
					if( sand.size() > 32 ) {
						const ball = balls.get( sand.hash()!.str )
						if( !ball ) return false
						sand.ball( ball )
					}
					
					return true
				} )
				
			}
			
			return [ ... parts ]
			
		}
	
		static size( parts: $hyoo_crus_pack_parts ) {
			
			const passes = new Set< string >()
			const balls = new Map< string, null | Uint8Array >()
			
			let size = 0
			
			for( const [,land] of parts ) {
				
				size += 24 // head
				size += land.faces.size * $hyoo_crus_face_size // Faces
				size += land.gifts.length * $hyoo_crus_gift.size // Gifts
				size += land.sands.length * $hyoo_crus_sand.size // Sands
				
				// Add Passes from Gifts to Balls
				for( const gift of land.gifts ) {
					
					const pass = gift.pass()
					passes.add( pass.hash().str )
					
					const mate = gift.mate()
					if( !mate ) continue
					
					passes.add( mate.hash().str )
				}
				
				// Add Passes from Sands to Balls
				for( const sand of land.sands ) {
					
					const pass = sand.pass()
					passes.add( pass.hash().str )
					
					if( sand.size() <= 32 ) continue
					const ball = sand.ball()
					balls.set( sand.hash()!.str, ball )
					
				}
				
			}
			
			size += passes.size * ( 64 + 8 ) // Passes
			
			// calc Balls
			for( const [ hash, ball ] of balls ) {
				size += ball ? Math.ceil( ball.length / 8 + .5 ) * 8 : 24 // content or Hash
			}
			
			return size
		}
		
		static make( parts: $hyoo_crus_pack_parts ) {
			
			let size = this.size( parts )
			if( size === 0 ) return null!
			
			const buff = new Uint8Array( size )
			const pack = new $hyoo_crus_pack( buff.buffer )
			
			let offset = 0
			
			// fill Lands
			for( const [ id, land ] of parts ) {
				
				pack.uint8( offset, $hyoo_crus_slot_kind.land ) // Kind
				// pack.uint32( offset, $hyoo_crus_part.land | ( land.faces.mass << 8 ) ) // Kind + Size?
				buff.set( new $hyoo_crus_link( id ).toBin(), offset + 4 ) // Land = Lord + Area
				pack.uint16( offset + 22, land.faces.size ) // Vers
				offset += 24
				
				// Peer + Mass + Tick + Time for every Face
				for( const [ peer, face ] of land.faces ) {
					buff.set( new $hyoo_crus_link( peer ).toBin(), offset )
					pack.uint16( offset + 6, face.tick )
					pack.uint32( offset + 8, face.time )
					pack.uint16( offset + 12, face.mass )
					offset += $hyoo_crus_face_size
				}
				
				// Gifts
				for( const gift of land.gifts ) {
					buff.set( gift.asArray(), offset )
					offset += gift.byteLength
				}
				
				// Sands
				for( const sand of land.sands ) {
					buff.set( sand.asArray(), offset )
					offset += sand.byteLength
				}
				
			}
			
			const balls = new Map< string, null | Uint8Array >()
			
			// collect Balls
			for( const [,land] of parts ) {
				
				for( const gift of land.gifts ) {
					
					const pass = gift.pass()
					balls.set( pass.hash().str, pass.asArray() )
					
					const mate = gift.mate()
					if( !mate ) continue
					
					balls.set( mate.hash().str, mate.asArray() )
				}
				
				for( const sand of land.sands ) {
					
					const pass = sand.pass()
					balls.set( pass.hash().str, pass.asArray() )
					
					if( sand.size() <= 32 ) continue
					const ball = sand.ball()
					balls.set( sand.hash()!.str, ball )
					
				}
				
			}
			
			// fill Balls
			for( const [ hash, ball ] of balls ) {
				
				const len = ball?.length ?? 0
				pack.uint32( offset, $hyoo_crus_slot_kind.ball | ( len << 8 ) ) // Kind + Size
				
				if( ball ) buff.set( ball, offset + 4 ) // content
				else buff.set( new $hyoo_crus_link( hash ).toBin(), offset + 6 ) // Hash
			
				offset += ball ? Math.ceil( len / 8 + .5 ) * 8 : 24
			}
			
			return pack
		}
		
	}
	
}
