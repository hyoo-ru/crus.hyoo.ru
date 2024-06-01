namespace $ {
	export class $hyoo_crus_yard_node extends $.$hyoo_crus_yard {
		
		@ $mol_mem
		root() {
			return $mol_file.relative( '.crus' )
		}
		
		@ $mol_mem_key
		land_file( land: $hyoo_crus_land ) {
			const id = land.ref().description!
			const dir = this.root().resolve( `unit/${ id.slice( 0, 2 ) }` )
			dir.exists( true )
			return dir.resolve( `${ id }.crus` )
		}
		
		@ $mol_mem_key
		land_offsets( land: $hyoo_crus_land ) {
			$mol_wire_solid() 
			return new Map< string, number >()
		}
		
		file_sizes = new Map< $hyoo_crus_land, number >()
		
		async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {
			
			const descr = this.land_file( land ).open( 'create', 'read_write' )
			try {
				
				const offsets = this.land_offsets( land )
				const append = [] as $hyoo_crus_unit[]
				
				for( const unit of units ) {
					const off = offsets.get( unit.key() )
					if( off === undefined ) {
						append.push( unit )
					} else {
						$node.fs.writeSync( descr, unit, 0, unit.byteLength, off )
					}
				}
				
				if( !append.length ) return
				
				let size = this.file_sizes.get( land ) ?? 0
				let offset = size
				size += append.length * $hyoo_crus_unit.size
				
				$node.fs.ftruncateSync( descr, size )
				this.file_sizes.set( land, size )
				
				for( const unit of append ) {
					$node.fs.writeSync( descr, unit, 0, unit.byteLength, offset )
					offsets.set( unit.key(), offset )
					offset += unit.byteLength
				}
			
			} finally {
				$node.fs.closeSync( descr )
			}
			
		}
		
		@ $mol_action
		load( land: $hyoo_crus_land ) {
			
			const descr = this.land_file( land ).open( 'create', 'read_write' )
			try {
			
				const buf = $node.fs.readFileSync( descr )
				if( !buf.length ) return []
				
				this.file_sizes.set( land, buf.length )
				const pack = $hyoo_crus_pack.from( buf )
				const { lands, rocks } = pack.parts( land.ref() )
				const units = lands[ land.ref() ]?.units ?? []
				
				const offsets = this.land_offsets( land )
				
				for( let i = 0; i < units.length; ++i ) {
					offsets.set( units[i].key(), i * $hyoo_crus_unit.size )
				}
				
				return units
				
			} finally {
				$node.fs.closeSync( descr )
			}
			
		}
		
	}
	$.$hyoo_crus_yard = $hyoo_crus_yard_node
}
