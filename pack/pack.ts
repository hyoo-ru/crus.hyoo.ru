namespace $ {
	
	export class $hyoo_crus_pack extends $mol_buffer {
		
		toBlob() {
			return new Blob( [ this ], { type: 'application/x-crus-pack' } )
		}
		
		parts() {
			
			const faces = {} as Record< typeof $hyoo_crus_ref.Value, $hyoo_crus_face_map >
			const units = {} as Record< typeof $hyoo_crus_ref.Value, $hyoo_crus_unit[] >
			const rocks = [] as [ Uint8Array, null | Uint8Array ][]
			
			const buff = this.asArray()
			let land = null as typeof $hyoo_crus_ref.Value | null
			
			for( let offset = 0; offset < this.byteLength; ) {
				
				const kind = this.uint8( offset )
				if( kind % 2 ) {
					
					switch( kind ) {
						
						case $hyoo_crus_part.land: {
							
							const head = new Uint8Array( buff.buffer, buff.byteOffset + offset, 4 )
							if( !$mol_compare_deep( $hyoo_crus_part_crus, head ) ) {
								$mol_fail( new Error( 'Wrong 4CC code' ) )
							}
							offset += 4
							
							land = $hyoo_crus_ref_decode(
								new Uint8Array( buff.buffer, buff.byteOffset + offset, 18 )
							)
							
							faces[ land ] ||= new $hyoo_crus_face_map
							
							offset += 20
							continue
						}
						
						case $hyoo_crus_part.face: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const count = this.uint32( offset ) >> 8
							const peer = $mol_base64_ae_encode(
								new Uint8Array( buff.buffer, buff.byteOffset + offset + 4, 6 )
							)
							const time = this.uint48( offset + 10 )
							offset += 16
							
							faces[ land ] ||= new $hyoo_crus_face_map
							faces[ land ].time_max( peer, time )
							faces[ land ].count_shift( peer, count )
							
							continue
						}
						
						case $hyoo_crus_part.pass: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const unit = new $hyoo_crus_pass(
								buff.slice( offset, offset += $hyoo_crus_unit.size ).buffer
							)
							
							units[ land ] ||= []
							units[ land ].push( unit )
							
							continue
						}
						
						case $hyoo_crus_part.gift: {
							
							if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
							
							const unit = new $hyoo_crus_gift(
								buff.slice( offset, offset += $hyoo_crus_unit.size ).buffer
							)
							
							units[ land ] ||= []
							units[ land ].push( unit )
							
							continue
						}
						
						case $hyoo_crus_part.hash: {
							
							const hash = buff.slice( offset += 4, offset += 24 )
							rocks.push([ hash, null ])
							
							continue
						}
						
						case $hyoo_crus_part.rock: {
							
							const size = this.uint32( offset ) >> 8
							const hash = buff.slice( offset += 4, offset += 24 )
							const rock = buff.slice( offset, offset + size )
							
							rocks.push([ hash, rock ])
							offset += Math.ceil( size / 8 ) * 8
							
							continue
						}
						
						case $hyoo_crus_part.buck: {
							offset += 128
							continue
						}
						
						default: $mol_fail( new Error( `Unknown CRUS Pack Part (${ kind.toString(2) }) at (${ offset.toString(16) })` ) )
						
					}
					
				} else {
					
					if( !land ) $mol_fail( new Error( 'Land is undefined' ) )
					
					units[ land ] ||= []
					units[ land ].push( new $hyoo_crus_gist(
						buff.slice( offset, offset += $hyoo_crus_unit.size ).buffer
					) )
					
					continue
				}
				
			}
			
			return { faces, units, rocks }
			
		}
	
		static make(
			faces: Record< typeof $hyoo_crus_ref.Value, $hyoo_crus_face_map >,
			units: Record< typeof $hyoo_crus_ref.Value, readonly $hyoo_crus_unit[] >,
			rocks: readonly [ Uint8Array, null | Uint8Array ][],
		) {
			
			let size = 0
			
			for( const land of Reflect.ownKeys( faces ) as typeof $hyoo_crus_ref.Value[] ) {
				size += 24 + faces[ land as typeof $hyoo_crus_ref.Value ].size * 16
			}
			
			for( const land of Reflect.ownKeys( units ) as typeof $hyoo_crus_ref.Value[] ) {
				size += 24 + units[ land as typeof $hyoo_crus_ref.Value ].length * $hyoo_crus_unit.size
			}
			
			for( const [ hash, rock ] of rocks ) {
				size += 24 + ( rock ? Math.ceil( rock.length / 8 ) * 8 : 0 )
			}
			
			if( size === 0 ) return null!
			
			const buff = new Uint8Array( size )
			const pack = new $hyoo_crus_pack( buff.buffer )
			
			let offset = 0
			
			const open_land = ( land: typeof $hyoo_crus_ref.Value )=> {
				buff.set( $hyoo_crus_part_crus, offset )
				buff.set( $hyoo_crus_ref_encode( land ), offset + 4 )
				offset += 24
			}
			
			for( const land of Reflect.ownKeys( faces ) as typeof $hyoo_crus_ref.Value[] ) {
				
				open_land( land )
				
				for( const peer of faces[ land ].keys() ) {
					pack.uint32( offset, ( faces[ land ].get( peer )!.count << 8 ) | $hyoo_crus_part.face )
					buff.set( $mol_base64_ae_decode( peer ), offset + 4 )
					pack.uint48( offset + 10, faces[ land ].time( peer ) )
					offset += 16
				}
				
			}
			
			for( const land of Reflect.ownKeys( units ) as typeof $hyoo_crus_ref.Value[] ) {
				
				open_land( land )
				
				for( const unit of units[ land ] ) {
					buff.set( unit.asArray(), offset )
					offset += unit.byteLength
				}
				
			}
			
			for( const [ hash, rock ] of rocks ) {
				const len = rock?.length ?? 0
				pack.uint32( offset, rock ? ( len << 8 ) + $hyoo_crus_part.rock : $hyoo_crus_part.hash )
				buff.set( hash, offset + 4 )
				if( rock ) buff.set( rock, offset + 24 )
				offset += 24 + Math.ceil( len / 8 ) * 8
			}
			
			return pack
		}
		
	}
	
	
	
}
