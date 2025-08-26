namespace $ {
	
	export const $hyoo_crus_pack_four_code = $mol_charset_encode( 'CRUS' ) // 43 52 55 53
	export const $hyoo_crus_pack_head_size = 4/*CRUS*/ + 12/*Lord*/ + 6/*Area*/ + 2/*Size*/
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export type $hyoo_crus_pack_parts = [ string, $hyoo_crus_pack_part ][]
	
	/**
	 * One Land info (Faces+Units) to Pack.
	 * Sync: +Faces -Units
	 * Diff: -Faces +Units
	 * Stop: -Faces -Units
	 */
	export class $hyoo_crus_pack_part extends Object {
		
		constructor(
			public units = [] as $hyoo_crus_unit[],
			public faces = new $hyoo_crus_face_map,
		) {
			super()
		}
		
		static from( units: $hyoo_crus_unit_base[], faces = new $hyoo_crus_face_map ) {
			return new this( units, faces )
		}
		
		*[ Symbol.iterator ]() {
			return {
				units: this.units,
				faces: this.faces,
			}
		}
		
	}
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export class $hyoo_crus_pack extends $mol_buffer {
		
		toBlob() {
			return new Blob( [ this ], { type: 'application/vnd.hyoo_crus_pack.v1' } )
		}
		
		parts() {
			
			const parts = new Map< string, $hyoo_crus_pack_part >
			let part = null as null | $hyoo_crus_pack_part
			
			const buf = this.asArray()
			
			for( let offset = 0; offset < this.byteLength; ) {
				
				const kind = this.uint8( offset )
				switch( $hyoo_crus_slot_kind[ kind ] as keyof typeof $hyoo_crus_slot_kind ) {
					
					case 'free': {
						offset += 8
						continue
					}
					
					case 'land': {
						
						const faces = new $hyoo_crus_face_map
						
						const link = $hyoo_crus_link.from_bin(
							new Uint8Array( buf.buffer, buf.byteOffset + offset + 4, 18 )
						)
						
						const size = this.uint16( offset + 22 )
						
						offset += 24
						
						// Faces
						for( let i = 0; i < size; ++i ) {
							
							const peer = $hyoo_crus_link.from_bin(
								new Uint8Array( buf.buffer, buf.byteOffset + offset, 6 )
							)
							
							const tick = this.uint16( offset + 6 )
							const time = this.uint32( offset + 8 )
							const summ = this.uint32( offset + 12 )
							
							faces.peer_time( peer.str, time, tick )
							faces.peer_summ( peer.str, summ )
							
							offset += $hyoo_crus_face.length()
							
						}
						
						parts.set( link.str, part = new $hyoo_crus_pack_part( [], faces ) )
						
						continue
					}
					
					case 'pass': {
						
						if( !part ) $mol_fail( new Error( 'Land is undefined' ) )
						
						const pass = $hyoo_crus_auth_pass.from(
							buf.slice( offset, offset += 64 )
						)
						
						part.units.push( pass )
						
						continue
					}
					
					case 'seal': {
						
						if( !part ) $mol_fail( new Error( 'Land is undefined' ) )
						
						const size = this.uint8( offset + 1 )
						const length = $hyoo_crus_unit_seal.length( size )
						
						const seal = $hyoo_crus_unit_seal.from(
							buf.slice( offset, offset += length )
						)
						
						part.units.push( seal )
						
						continue
					}
					
					case 'sand': {
						
						if( !part ) $mol_fail( new Error( 'Land is undefined' ) )
						
						const size = this.uint16( offset + 26 )
						const length_sand = $hyoo_crus_sand.length( size )
						const length_ball = $hyoo_crus_sand.length_ball( size )
						
						const sand = $hyoo_crus_sand.from(
							buf.slice( offset, offset += length_sand )
						)
						
						if( length_ball ) {
							sand._ball = buf.slice( offset, size )
							offset += length_sand
						}
						
						part.units.push( sand )
						
						continue
					}
					
					case 'gift': {
						
						if( !part ) $mol_fail( new Error( 'Land is undefined' ) )
						
						const length = $hyoo_crus_gift.length()
						const gift = $hyoo_crus_gift.from( buf.slice( offset, offset += length ) )
						
						part.units.push( gift )
						
						continue
					}
					
					default:
						$$.$mol_log3_warn({
							place: this,
							message: 'Unknown Kind',
							kind,
							offset,
							hint: 'Try to update application',
						})
						return [ ... parts ]
				}
				
			}
			
			return [ ... parts ]
			
		}
	
		static length( parts: $hyoo_crus_pack_parts ) {
			
			let size = 0
			
			for( const [ land, { units, faces } ] of parts ) {
				
				size += $hyoo_crus_pack_head_size
				size += faces.size * $hyoo_crus_face.length()
				
				for( const unit of units ) {
					
					size += unit.byteLength
					
					if( unit instanceof $hyoo_crus_auth_pass ) continue
					
					unit.choose({
						gift: gift => {},
						seal: seal => {},
						sand: sand => {
							if( sand.size() > $hyoo_crus_sand.size_equator ) {
								size += sand.ball().byteLength
							}
						},
					})
					
				}
				
			}
			
			return size
		}
		
		static make( parts: $hyoo_crus_pack_parts ) {
			
			let length = this.length( parts )
			if( length === 0 ) $mol_fail( new Error( 'Empty Pack' ) )
			
			const buff = new Uint8Array( length )
			const pack = new $hyoo_crus_pack( buff.buffer )
			
			let offset = 0
			
			// fill Lands
			for( const [ id, { units, faces } ] of parts ) {
				
				// Head
				buff.set( $hyoo_crus_pack_four_code, offset ) // 4B
				buff.set( new $hyoo_crus_link( id ).toBin(), offset + 4 ) // Land = Lord + Area
				pack.uint16( offset + 22, faces.size ) // Vers
				offset += 24
				
				// Peer + Tick + Time + Summ for every Face
				for( const [ peer, face ] of faces ) {
					buff.set( new $hyoo_crus_link( peer ).toBin(), offset )
					pack.uint16( offset + 6, face.tick )
					pack.uint32( offset + 8, face.time )
					pack.uint32( offset + 12, face.summ )
					offset += $hyoo_crus_face.length()
				}
				
				// Units + Balls
				for( const unit of units ) {
					
					buff.set( unit.asArray(), offset )
					offset += unit.byteLength
					
					if( unit instanceof $hyoo_crus_auth_pass ) continue
					
					unit.choose({
						gift: gift => {},
						seal: seal => {},
						sand: sand => {
							if( sand.size() > $hyoo_crus_sand.size_equator ) {
								buff.set( sand.ball(), offset )
								offset += $hyoo_crus_sand.length_ball( sand.size() )
							}
						},
					})
					
				}
				
			}
			
			return pack
		}
		
	}
	
}
