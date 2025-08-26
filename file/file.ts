namespace $ {
	export class $hyoo_crus_file extends $hyoo_crus_dict.with( {
		/** File name */
		Name: $hyoo_crus_atom_str,
		/** File Content-Type */
		Type: $hyoo_crus_atom_str,
		/** File content in chunks - list of binaries */
		Chunks: $hyoo_crus_list_bin,
	}) {
		
		/** Persistent URI to file content */
		uri() {
			return `?CRUS:file=${ this.link() };name=${ this.name() }`
		}
		
		/** File name */
		name( next?: string | null ) {
			const ext = {
				'text/plain': 'txt',
				'application/json': 'json',
			}[ this.type() ] ?? 'bin'
			return this.Name( next )?.val( next ) ?? `${ this.link() }.${ ext }`
		}
		
		/** Mime type */
		type( next?: string | null ) {
			return this.Type( next )?.val( next ) ?? 'application/octet-stream'
		}
		
		/** Blob, File etc. */
		blob( next?: $mol_blob ): $mol_blob {
			
			if( !next ) return new $mol_blob( this.chunks(), { type: this.type() } )
			
			const buffer = new Uint8Array( $mol_wire_sync( next ).arrayBuffer() )
			
			this.buffer( buffer )
			this.type( next.type )
			if( next instanceof $mol_dom_context.File ) this.name( next.name )
			
			return next
		}
		
		/** Solid byte buffer. */
		buffer( next?: Uint8Array< ArrayBuffer > ) {
			
			if( next ) {
				
				const chunks = [] as Uint8Array[]
				
				for( let offset = 0; offset < next.byteLength; ) {
					chunks.push( next.slice( offset, offset += 2**15 ) ) // split by 32 KB
				}
				
				this.chunks( chunks )
				
				return next
				
			} else {
				
				const chunks = this.chunks()
				const size = chunks.reduce( ( sum, chunk )=> sum + chunk.byteLength, 0 )
				const res = new Uint8Array( size )
				
				let offset = 0
				for( const chunk of chunks ) {
					res.set( chunk, offset )
					offset += chunk.byteLength
				}
				
				return res
				
			}
			
		}
		
		chunks( next?: readonly ( Uint8Array< ArrayBuffer > | null )[] ) {
			return this.Chunks( next )?.items( next )?.filter( $mol_guard_defined ) ?? []
		}
		
		str( next?: string, type = 'text/plain' ) {
			
			if( next === undefined ) return $mol_charset_decode( this.buffer() )
				
			this.buffer( $mol_charset_encode( next ) )
			this.type( type )
			
			return next
		}
		
		json( next?: any, type = 'application/json' ) {
			
			if( next === undefined ) return JSON.parse( this.str() )
				
			this.str( JSON.stringify( next ), type )
			
			return next
		}
		
	}
}
