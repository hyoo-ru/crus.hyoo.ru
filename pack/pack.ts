namespace $ {
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export type $hyoo_crus_pack_parts = {
		
		lands: Record< $hyoo_crus_ref, {
			faces: $hyoo_crus_face_map,
			units: $hyoo_crus_unit[],
		} >,
		
		/** List of BLOB identified by Hash. */
		rocks: [ Uint8Array< ArrayBuffer >, null | Uint8Array< ArrayBuffer > ][],
		
	}
	
	/** Universal binary package which contains some Faces/Units/Rocks */
	export class $hyoo_crus_pack extends $mol_buffer {
		
		toBlob() {
			return new Blob( [ this ], { type: 'application/vnd.hyoo_crus_pack' } )
		}
		
		parts( land = null as $hyoo_crus_ref | null ) {
			
			const lands = {} as $hyoo_crus_pack_parts[ 'lands' ]
			if( land ) lands[ land ] = { faces: new $hyoo_crus_face_map, units: [] }
			
			let total = 0
			
			const rocks = [] as $hyoo_crus_pack_parts[ 'rocks' ]
			
			const buf = this.asArray()
			
			for( let offset = 0; offset < this.byteLength; ) {
				
				const kind = this.uint8( offset )
				if( !kind ) break
				
				if( kind % 2 ) {
					
					switch( kind ) {
						
						case $hyoo_crus_part.land: {
							
							const faces = new $hyoo_crus_face_map
							faces.total = this.uint32( offset ) >> 8
							offset += 4
							
							land = $hyoo_crus_ref_decode(
								new Uint8Array( buf.buffer, buf.byteOffset + offset, 18 )
							)
							offset += 20
							
							lands[ land ] = { faces, units: [] }
							
							continue
						}
						
						case $hyoo_crus_part.face: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const count = this.uint32( offset ) >> 8
							offset += 4
							
							const faces = lands[ land ].faces
							for( let i = 0; i < count; ++i ) {
								
								const peer = $mol_base64_ae_encode(
									new Uint8Array( buf.buffer, buf.byteOffset + offset, 6 )
								)
								
								const time = this.uint48( offset + 6 )
								
								faces.time_max( peer, time )
								offset += 12
								
							}
							
							offset = Math.ceil( offset / 8 ) * 8
							
							continue
						}
						
						case $hyoo_crus_part.pass: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const unit = new $hyoo_crus_pass(
								buf.slice( offset, offset += $hyoo_crus_unit.size ).buffer
							)
							
							lands[ land ].units ||= []
							lands[ land ].units.push( unit )
							
							continue
						}
						
						case $hyoo_crus_part.gift: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const unit = new $hyoo_crus_gift(
								buf.slice( offset, offset += $hyoo_crus_unit.size ).buffer
							)
							
							lands[ land ].units ||= []
							lands[ land ].units.push( unit )
							
							continue
						}
						
						case $hyoo_crus_part.rock: {
							
							const size = this.uint32( offset ) >> 8
							if( size === 0 ) {
								
								const hash = buf.slice( offset + 4, offset + 4 + 24 )
								rocks.push([ hash, null ])
								offset += 4 + 24
								
							} else {
								
								const rock = buf.slice( offset + 4, offset + 4 + size )
								
								const hash = $mol_crypto_hash( rock )
								rocks.push([ hash, rock ])
								
								offset += Math.ceil( size / 8 + .5 ) * 8
							
							}
							continue
							
						}
						
						case $hyoo_crus_part.root:
						case $hyoo_crus_part.buck: {
							offset += 128
							continue
						}
						
						default: $mol_fail( new Error( `Unknown CRUS Pack Part (${ kind.toString(2) }) at (${ offset.toString(16) })` ) )
						
					}
					
				} else {
					
					if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
					
					const unit = $hyoo_crus_sand.from(
						buf.slice( offset, offset += $hyoo_crus_unit.size )
					)
					
					lands[ land ].units ||= []
					lands[ land ].units.push( unit )
			
					continue
				}
				
			}
			
			return { lands, rocks }
			
		}
	
		static make( { lands, rocks }: $hyoo_crus_pack_parts ) {
			
			let size = 0
			
			for( const land of Reflect.ownKeys( lands ) as $hyoo_crus_ref[] ) {
				size += 24
				// if( lands[ land ].faces.size ) {
					size += Math.ceil( lands[ land ].faces.size * 12 / 8 + .5 ) * 8
				// }
				size += lands[ land ].units.length * $hyoo_crus_unit.size
			}
			
			for( const [ hash, rock ] of rocks ) {
				size += rock ? Math.ceil( rock.length / 8 + .5 ) * 8 : 24
			}
			
			if( size === 0 ) return null!
			
			const buff = new Uint8Array( size )
			const pack = new $hyoo_crus_pack( buff.buffer )
			
			let offset = 0
			
			for( const land of Reflect.ownKeys( lands ) as $hyoo_crus_ref[] ) {
				
				const faces = lands[ land ].faces
				
				pack.uint32( offset, $hyoo_crus_part.land | ( faces.total << 8 ) )
				buff.set( $hyoo_crus_ref_encode( land ), offset + 4 )
				offset += 24
				
				// if( !faces.size ) continue
				
				pack.uint32( offset, $hyoo_crus_part.face | ( faces.size << 8 ) )
				offset += 4
				for( const [ peer, time ] of faces ) {
					buff.set( $mol_base64_ae_decode( peer ), offset )
					pack.uint48( offset + 6, time )
					offset += 12
				}
				offset = Math.ceil( offset / 8 ) * 8
				
				for( const unit of lands[ land ].units ) {
					buff.set( unit.asArray(), offset )
					offset += unit.byteLength
				}
				
			}
			
			for( const [ hash, rock ] of rocks ) {
				
				const len = rock?.length ?? 0
				pack.uint32( offset, $hyoo_crus_part.rock | ( len << 8 ) )
				
				if( rock ) buff.set( rock, offset + 4 )
				else buff.set( hash, offset + 4 )
			
				offset += rock ? Math.ceil( len / 8 + .5 ) * 8 : 24
			}
			
			return pack
		}
		
	}
	
	
	
}
