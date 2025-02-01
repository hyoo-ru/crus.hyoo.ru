namespace $ {
	export class $hyoo_crus_mine_fs extends $hyoo_crus_mine {
		
		@ $mol_memo.method
		static root() {
			
			const root = this.$.$mol_file.relative( '.crus' )
			
			this.$.$mol_log3_rise({
				place: this,
				message: 'File Storage Ready',
				path: root.path()
			})
			
			return root
		}
		
		@ $mol_mem_key
		static rock_file( hash: $hyoo_crus_link ) {
			return this.root().resolve( `rock/${ hash.str.slice( 0, 2 ) }/${ hash }.blob` )
		}
		
		@ $mol_mem_key
		static rock( hash: $hyoo_crus_link, next?: Uint8Array< ArrayBuffer > ): Uint8Array< ArrayBuffer > | null {
			const buf = this.rock_file( hash ).buffer( next )
			if( next ) return buf
			if( hash.str === $hyoo_crus_link.hash_bin( buf ).str ) return buf
			return null
		}
		
		@ $mol_mem_key
		static units_file( land: $hyoo_crus_link ) { $hyoo_crus_land
			const dir = this.root().resolve( `unit/${ land.str.slice( 0, 2 ) }` )
			dir.exists( true )
			return dir.resolve( `${ land }.crus` )
		}
		
		@ $mol_mem_key
		static units_offsets( land: $hyoo_crus_link ) {
			$mol_wire_solid() 
			return new Map< string, number >()
		}
		
		static units_sizes = new Map< string, number >()
		
		static units_save( land: $hyoo_crus_link, units: readonly $hyoo_crus_unit[] ) {
			
			const descr = this.units_file( land ).open( 'create', 'read_write' )
			try {
				
				const offsets = this.units_offsets( land )
				const append = [] as $hyoo_crus_unit[]
				
				for( const unit of units ) {
					const off = offsets.get( unit.key() )
					if( off === undefined ) {
						append.push( unit )
					} else {
						descr.write({ buffer: unit, position: off })
						this.units_persisted.add( unit )
					}
				}
				
				if( !append.length ) return
				
				let size = this.units_sizes.get( land.str ) ?? 0
				let offset = size
				size += append.length * $hyoo_crus_unit.size
				descr.truncate(size)
				this.units_sizes.set( land.str, size )
				
				for( const unit of append ) {
					descr.write({ buffer: unit, position: offset })
					offsets.set( unit.key(), offset )
					this.units_persisted.add( unit )
					offset += unit.byteLength
				}
			
			} finally {
				descr.close()
			}
			
			return undefined as any
		}
		
		@ $mol_action
		static async units_load( land: $hyoo_crus_link ) {
			
			const descr = this.units_file( land ).open( 'create', 'read_write' )
			try {
			
				const buf = descr.read()
				if( !buf.length ) return []
				
				this.units_sizes.set( land.str, buf.length )
				const pack = $hyoo_crus_pack.from( buf )
				const { lands, rocks } = pack.parts( land )
				const units = lands[ land.str ]?.units ?? []
				
				const offsets = this.units_offsets( land )
				
				for( let i = 0; i < units.length; ++i ) {
					offsets.set( units[i].key(), i * $hyoo_crus_unit.size )
					this.units_persisted.add( units[i] )
				}
				
				return units
				
			} finally {
				descr.close()
			}
			
		}
		
	}
}
