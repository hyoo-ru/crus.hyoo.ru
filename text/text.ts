namespace $ {
	export class $hyoo_crus_text extends $hyoo_crus_list {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
				
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
					drop: ( prev, lead )=> this.land().post( lead?.self() ?? 0, prev.head(), prev.self(), null ),
					insert: ( next, lead )=> {
						const gist = this.land().post( lead?.self() ?? 0, this.head(), land.self_make(), 'p', 'vals' )
						land.Node( $hyoo_crus_text ).Item( gist.self() ).str( next )
						return gist
					},
					update: ( next, prev, lead )=> {
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
					if( unit.tag() === 'term' ) str += String( land.gist_decode( unit ) ?? '' )
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
				
				word = String( land.gist_decode( list[ from ] ) ?? '' )
				
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
				
				word = String( land.gist_decode( list[ to ] ) ?? '' )
				to ++
				
				if( str_to < word.length ) {
					next = next + word.slice( str_to )
					break
				}
				
				str_to -= word.length
				
			}
			
			if( from && from === list.length ) {
				-- from
				next = String( land.gist_decode( list[ from ] ) ?? '' ) + next
			}
			
			const words = next.match( $hyoo_crowd_tokenizer ) ?? []
			this.splice( words, from, to )
			
			return this
		}

		@ $mol_action
		point_by_offset( offset: number ): readonly[ number /*self*/, number /*pos*/ ] {
			
			const land = this.land()
			let off = offset
			
			for( const unit of this.units() ) {
				
				if( unit.tag() === 'term' ) {
					
					const len = String( land.gist_decode( unit ) ?? '' ).length
					
					if( off <= len ) return [ unit.self(), off ]
					else off -= len
					
				} else {
					
					const found = land.Node( $hyoo_crus_text ).Item( unit.self() ).point_by_offset( off )
					if( found[0] ) return found
					
					off = found[1]
					
				}
				
			}
			
			return [ 0, off ]
		}
		
		@ $mol_action
		offset_by_point( [ self, offset ]: readonly[ number /*self*/, number /*pos*/ ] ): readonly[ number /*self*/, number /*pos*/ ]  {
			
			const land = this.land()
			
			for( const unit of this.units() ) {
				
				if( unit.self() === self ) return [ self, offset ]
				
				if( unit.tag() === 'term' ) {
					
					offset += String( land.gist_decode( unit ) ?? '' ).length
					
				} else {
					
					const found = land.Node( $hyoo_crus_text ).Item( unit.self() ).offset_by_point([ self, offset ])
					if( found[0] ) return [ self, found[1] ]
					
					offset = found[1]
					
				}
				
			}
			
			return [ 0, offset ]
		}
		
		@ $mol_mem_key
		selection( lord: bigint, next?: readonly[ number /*begin*/, number /*end*/ ] ) {
			
			const base = this.realm()!.Lord( lord ).base()
			
			if( next ) {
				
				base.selection( next.map( offset => this.point_by_offset( offset ) ) )
				return next
				
			} else {
				
				// this.units() // track text to recalc selection on its change
				return base.selection().map( point => this.offset_by_point( point )[1] )
					
			}
			
		}
		
	}
	
}
