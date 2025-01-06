/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {
	export class $hyoo_crus_dom extends $hyoo_crus_node {
		
		dom( next?: ( Element | Attr | Text )[] ): ( Element | Attr | Text )[] {
			
			const land = this.land()
			const doms = land.Node( $hyoo_crus_dom )
			const regs = land.Node( $hyoo_crus_atom_str )
			
			if( next ) {
				
				const ids = new Set< string >()
				for( const node of next ) {
					if(!( node instanceof this.$.$mol_dom_context.Element )) continue
					const id = $hyoo_crus_ref_check( node.id )
					if( !id || ids.has( id ) ) node.id = ''
					ids.add( id )
				}
				
				const sample = [] as ( Element | Attr | string )[]
				let texts = ''

				function flush() {
					if( !texts.length ) return 
					for( const token of texts.matchAll( $hyoo_crus_text_tokens ) ) {
						sample.push( token[0] )
					}
					texts = ''
				}

				function collect( node: Element | Attr | Text ) {

					switch( node.nodeType ) {
					
						case( node.ELEMENT_NODE ): {
							if( ( node as Element ).localName === 'span' ) {
								for( const kid of [ ... node.childNodes ] ) {
									collect( kid as Element )
								}
							} else {
								flush()
								sample.push( node as Element )
							}
							return
						}

						case( node.ATTRIBUTE_NODE ): {
							if( node.nodeName === 'id' ) return
							if( node.nodeName === 'xmlns' ) return
							sample.push( node as Attr )
							return
						}

						case( node.TEXT_NODE ): {
							texts += node.nodeValue!
							return
						}

					}

				}
				for( const node of next ) collect( node )
				flush()
				
				function attr( el: Element ) {
					let res = {} as Record< string, string >
					for( const a of el.attributes ) {
						if( a.name === 'id' ) continue
						res[ a.name ] = a.value
					}
					return res
				}
				
				function val( el: Attr | Element | string ) {
					return typeof el === 'string'
						? el
						: el.localName === 'span'
							? el.textContent
							: el.localName
				}
				
				function tag( el: Attr | Element | string ) {
					return typeof el === 'string'
						? 'term'
						: el.nodeType === el.ATTRIBUTE_NODE
							? 'solo'
							: el.localName === 'span'
								? 'term'
								: 'vals'
				}
				
				let units = this.units()
				
				$mol_reconcile({
					prev: units,
					from: 0,
					to: units.length,
					next: sample,
					equal: ( next, prev )=> {
						if( typeof next === 'string' ) {
							const p = $hyoo_crus_vary_cast_str( land.sand_decode( prev ) )
							if( !p ) return false
							return p.startsWith( next ) || next.startsWith( p )
						} else if( next.nodeType === next.ATTRIBUTE_NODE ) {
							return land.sand_decode( prev ) === next.nodeName
						} else {
							return prev.self() === ( next as Element ).id
						}
					},
					drop: ( prev, lead )=> land.sand_wipe( prev ),
					insert: ( next, lead )=> {
						return land.post(
							lead?.self() ?? '',
							this.head(),
							typeof next === 'string'
								? ''
								: next.nodeType === next.ATTRIBUTE_NODE
									? ''
									: ( $hyoo_crus_ref( ( next as Element ).id )?.description ?? '' ),
							val( next ),
							tag( next ),
						)
					},
					update: ( next, prev, lead )=> ( typeof next !== 'string' || next === land.sand_decode( prev ) )
						? prev
						: land.post(
							lead?.self() ?? '',
							prev.head(),
							prev.self(),
							val( next ),
							tag( next ),
						),
					replace: ( next, prev, lead )=> land.post(
						lead?.self() ?? '',
						prev.head(),
						prev.self(),
						val( next ),
						tag( next ),
					),
				})

				units = this.units()
				for( let i = 0; i < units.length; ++i ) {
					
					const sam = sample[i]
					if( typeof sam === 'string' ) continue

					if( sam.nodeType === sam.ATTRIBUTE_NODE ) {
						regs.Item( units[i].self() ).val( sam.nodeValue )
					} else if( sam.nodeName !== 'span' ) {
						doms.Item( units[i].self() ).dom([
							... ( sam as Element ).attributes,
							... [ ... ( sam as Element ).childNodes ] as Element[],
						] )
					}
					
				}
				
				return next
				
			} else {
				
				return this.units().flatMap( unit => {

					if( unit.tag() === 'solo' ) return []
					
					const Tag = unit.tag() === 'term'
						? 'span'
						: ( land.sand_decode( unit ) as string ) ?? 'p'
					
					const attrs = unit.tag() === 'vals'
						? Object.fromEntries(
							regs.Item( unit.self() ).units()
							.filter( sand => sand.tag() === 'solo' )
							.map( sand => [ land.sand_decode( sand ), regs.Item( sand.self() ).val() ] )
						)
						: {}
					
					const content = unit.tag() === 'term'
						? $hyoo_crus_vary_cast_str( land.sand_decode( unit ) )
						: doms.Item( unit.self() ).dom()
					
					return <Tag { ... attrs } id={ unit.self() } >{ content }</Tag>
					
				} )
				
			}
			
		}
		
		html( next?: string ) {
			
			if( next === undefined ) {
				return $mol_dom_serialize( <>{ this.dom() }</> )
			} else {
				this.dom( [ ... $mol_dom_parse( `<body>${ next }</body>` ).documentElement.childNodes ] as Element[] )
				return next
			}
			
		}

		@ $mol_mem_key
		selection(
			lord: $hyoo_crus_ref,
			next?: readonly( readonly[ string /*self*/, number /*pos*/ ] )[],
		): readonly( readonly[ string /*self*/, number /*pos*/ ] )[]  {

			const base = this.$.$hyoo_crus_glob.Land( lord ).Data( $hyoo_crus_home )
			
			if( next ) {
				
				base.Selection(null)?.val( next.map( point => point.join( ':' ) ).join( '|' ) )
				return next
				
			} else {
				
				return base.Selection()?.val()?.split( '|' ).map( point => {
					const chunks = point.split( ':' )
					return [ chunks[0], Number( chunks[1] ) || 0 ]
				} ) ?? [ [ this.head(), 0 ], [ this.head(), 0 ] ]
					
			}

		}
		
	}
}
