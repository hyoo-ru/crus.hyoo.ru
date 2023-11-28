namespace $ {
	export class $hyoo_crowds_text extends $hyoo_crowds_node {
		
		/** Text representation. Based on list of strings. */
		text( next?: string ): string {
			
			if( next === undefined ) {
				
				return this.str()
			
			} else {
				
				const area = this.area()
				const prev = this.units()
				const lines = next.match( /.*\n|.+$/g ) ?? []
				
				$mol_reconcile({
					prev,
					from: 0,
					to: prev.length,
					next: lines,
					equal: ( next, prev )=> {
						//if( typeof prev.data === 'string' ) return false // ???
						return area.Node( $hyoo_crowds_text ).Item( prev.self() ).str() === next
					},
					drop: ( prev, lead )=> this.area().post( lead?.self() ?? 0, prev.head(), prev.self(), null ),
					insert: ( next, lead )=> {
						const gist = this.area().post( lead?.self() ?? 0, this.head(), 0, next, 'list' )
						area.Node( $hyoo_crowds_text ).Item( gist.self() ).str( next )
						return gist
					},
					update: ( next, prev, lead )=> {
						area.Node( $hyoo_crowds_text ).Item( prev.self() ).str( next )
						return prev
					},
				})
				
				return next
			}
			
		}
		
		/** Text representation. Based on list of strings. */
		str( next?: string ) {
			
			if( next === undefined ) {
				
				let str = ''
				const area = this.area()
				
				for( const unit of this.units() ) {
					if( unit.tag() === 'term' ) str += area.gist_decode( unit )
					else str += area.Node( $hyoo_crowds_text ).Item( unit.self() ).str()
				}
				
				return str
			
			} else {
				
				this.write( next, 0, -1 )
				
				return next
			}
			
		}
		
		write(
			next: string,
			str_from = -1,
			str_to = str_from,
		) {
			
			const area = this.area()
			const list = this.units()
			
			let from = str_from < 0 ? list.length : 0
			let word = ''
			
			while( from < list.length ) {
				
				word = String( area.gist_decode( list[ from ] ) )
				
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
				
				word = String( area.gist_decode( list[ to ] ) )
				to ++
				
				if( str_to < word.length ) {
					next = next + word.slice( str_to )
					break
				}
				
				str_to -= word.length
				
			}
			
			if( from && from === list.length ) {
				-- from
				next = String( area.gist_decode( list[ from ] ) ) + next
			}
			
			const words = next.match( $hyoo_crowd_tokenizer ) ?? []
			this.cast( $hyoo_crowds_list ).splice( words, from, to )
			
			return this
		}

		point_by_offset( offset: number ): readonly[ number /*self*/, number /*pos*/ ] {
			
			const area = this.area()
			let off = offset
			
			for( const unit of this.units() ) {
				
				if( unit.tag() === 'term' ) {
					
					const len = String( area.gist_decode( unit ) ).length
					
					if( off <= len ) return [ unit.self(), off ]
					else off -= len
					
				} else {
					
					const found = area.Node( $hyoo_crowds_text ).Item( unit.self() ).point_by_offset( off )
					if( found[0] ) return found
					
					off = found[1]
					
				}
				
			}
			
			return [ 0, off ]
		}
		
		offset_by_point( [ self, offset ]: readonly[ number /*self*/, number /*pos*/ ] ): readonly[ number /*self*/, number /*pos*/ ]  {
			
			const area = this.area()
			
			for( const unit of this.units() ) {
				
				if( unit.self() === self ) return [ self, offset ]
				
				if( unit.tag() === 'term' ) {
					
					offset += String( area.gist_decode( unit ) ).length
					
				} else {
					
					const found = area.Node( $hyoo_crowds_text ).Item( unit.self() ).offset_by_point([ self, offset ])
					if( found[0] ) return [ self, found[1] ]
					
					offset = found[1]
					
				}
				
			}
			
			return [ 0, offset ]
		}
		
		selection( lord: bigint, next?: readonly[ number /*begin*/, number /*end*/ ] ) {
			
			const home = this.realm()!.Land( lord ).home()
			
			if( next ) {
				
				home.selection( next.map( offset => this.point_by_offset( offset ) ) )
				return next
				
			} else {
				
				// this.units() // track text to recalc selection on its change
				return home.selection().map( point => this.offset_by_point( point )[1] )
					
			}
			
		}
		
	}
	
}
