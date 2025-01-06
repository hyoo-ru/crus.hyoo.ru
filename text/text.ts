namespace $ {
	/** Mergeable text node */
	export class $hyoo_crus_text extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_sand_tag[ $hyoo_crus_sand_tag.vals ] as keyof typeof $hyoo_crus_sand_tag
				
		value( next?: string ): string {
			return this.text( next )
		}
		
		/** Text representation. Based on list of strings. */
		@ $mol_mem
		text( next?: string ): string {
			
			if( next !== undefined ) {
				
				const land = this.land()
				const prev = this.units()
				const lines = next.match( /.*\n|.+$/g ) ?? []
				
				$mol_reconcile({
					prev,
					from: 0,
					to: prev.length,
					next: lines,
					equal: ( next, prev )=> {
						//if( typeof prev.data === 'string' ) return false // ???
						return land.Node( $hyoo_crus_text ).Item( prev.self() ).str() === next
					},
					drop: ( prev, lead )=> this.land().post( lead?.self() ?? '', prev.head(), prev.self(), null ),
					insert: ( next, lead )=> {
						const sand = this.land().post( lead?.self() ?? '', this.head(), land.self_make(), 'p', 'vals' )
						land.Node( $hyoo_crus_text ).Item( sand.self() ).str( next )
						return sand
					},
					replace: ( next, prev, lead )=> {
						land.Node( $hyoo_crus_text ).Item( prev.self() ).str( next )
						return prev
					},
				})
				
			}
			
			return this.str()
		}
		
		/** Text representation. Based on list of strings. */
		@ $mol_mem
		str( next?: string ): string {
			
			if( next === undefined ) {
				
				let str = ''
				const land = this.land()
				
				for( const unit of this.units() ) {
					if( unit.tag() === 'term' ) str += $hyoo_crus_vary_cast_str( land.sand_decode( unit ) ) ?? ''
					else str += land.Node( $hyoo_crus_text ).Item( unit.self() ).str()
				}
				
				return str
			
			} else {
				
				this.write( next, 0, -1 )
				
				return this.str()
			}
			
		}
		
		@ $mol_action
		write(
			next: string,
			str_from = -1,
			str_to = str_from,
		) {
			
			const land = this.land()
			const list = this.units()
			
			let from = str_from < 0 ? list.length : 0
			let word = ''
			
			while( from < list.length ) {
				
				word = $hyoo_crus_vary_cast_str( land.sand_decode( list[ from ] ) ) ?? ''
				
				if( str_from <= word.length ) {
					next = word.slice( 0, str_from ) + next
					break
				}
				
				str_from -= word.length
				if( str_to > 0 ) str_to -= word.length
				
				from ++
				
			}
			
			let to = str_to < 0 ? list.length : from
			
			while( to < list.length ) {
				
				word = $hyoo_crus_vary_cast_str( land.sand_decode( list[ to ] ) ) ?? ''
				to ++
				
				if( str_to < word.length ) {
					next = next + word.slice( str_to )
					break
				}
				
				str_to -= word.length
				
			}
			
			if( from && from === list.length ) {
				-- from
				next = ( $hyoo_crus_vary_cast_str( land.sand_decode( list[ from ] ) ) ?? '' ) + next
			}
			
			const words = next.match( $hyoo_crus_text_tokens ) ?? []
			this.cast( $hyoo_crus_list_vary ).splice( words, from, to )
			
			return this
		}

		@ $mol_action
		point_by_offset( offset: number ): readonly[ string /*self*/, number /*pos*/ ] {
			
			const land = this.land()
			let off = offset
			
			for( const unit of this.units() ) {
				
				if( unit.tag() === 'term' ) {
					
					const len = $hyoo_crus_vary_cast_str( land.sand_decode( unit ) )?.length ?? 0
					
					if( off <= len ) return [ unit.self(), off ]
					else off -= len
					
				} else {
					
					const found = land.Node( $hyoo_crus_text ).Item( unit.self() ).point_by_offset( off )
					if( found[0] ) return found
					
					off = found[1]
					
				}
				
			}
			
			return [ '', off ]
		}
		
		@ $mol_action
		offset_by_point( [ self, offset ]: readonly[ string /*self*/, number /*pos*/ ] ): readonly[ string /*self*/, number /*pos*/ ]  {
			
			const land = this.land()
			
			for( const unit of this.units() ) {
				
				if( unit.self() === self ) return [ self, offset ]
				
				if( unit.tag() === 'term' ) {
					
					offset += $hyoo_crus_vary_cast_str( land.sand_decode( unit ) )?.length ?? 0
					
				} else {
					
					const found = land.Node( $hyoo_crus_text ).Item( unit.self() ).offset_by_point([ self, offset ])
					if( found[0] ) return [ self, found[1] ]
					
					offset = found[1]
					
				}
				
			}
			
			return [ '', offset ]
		}
		
		@ $mol_mem_key
		selection( lord: $hyoo_crus_ref, next?: readonly[ begin: number, end: number ] ) {
			
			const base = this.$.$hyoo_crus_glob.Land( lord ).Data( $hyoo_crus_home )
			
			if( next ) {
				
				base.Selection(null)?.val( next.map( offset => this.point_by_offset( offset ).join( ':' ) ).join( '|' ) )
				return next
				
			} else {
				
				this.text() // track text to recalc selection on its change
				return base.Selection()?.val()?.split( '|' ).map( point => {
					const chunks = point.split( ':' )
					return this.offset_by_point([ chunks[0], Number( chunks[1] ) || 0 ])[1]
				} ) ?? [ 0, 0 ]
					
			}
			
		}
		
	}
	
}
