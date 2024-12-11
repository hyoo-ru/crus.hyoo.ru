/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {
	export class $hyoo_crus_dom extends $hyoo_crus_node {
		
		dom( next?: Element | DocumentFragment ) {
			
			const land = this.land()
			const doms = land.Node( $hyoo_crus_dom )
			const regs = land.Node( $hyoo_crus_atom_str )
			
			if( next ) {
				
				const ids = new Set< string >()
				for( const node of next.childNodes ) {
					if(!( node instanceof this.$.$mol_dom_context.Element )) continue
					if( ids.has( node.id ) ) node.id = ''
					ids.add( node.id )
				}
				
				const sample = [] as ( string | Element | Attr )[]
				function collect( next: Element | DocumentFragment ) {
					if( next.nodeType === Node.ELEMENT_NODE ) {
						for( const attr of ( next as Element ).attributes ) {
							if( attr.localName === 'id' ) continue
							if( attr.localName === 'xmlns' ) continue
							sample.push( attr )
						}
					}
					for( const node of next.childNodes ) {
						
						if( node.nodeType === node.TEXT_NODE ) {
							for( const token of node.nodeValue!.matchAll( $hyoo_crus_text_tokens ) ) {
								sample.push( token[0] )
							}
						} else {
							if( ( node as Element ).localName === 'span' && !Number( ( node as Element ).id ) ) {
								collect( node as Element )
							} else {
								sample.push( node as Element )
							}
						}
						
					}
				}
				collect( next )
				
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
				
				let units = this.units().filter( sand => sand.tag() !== 'solo' )
				
				$mol_reconcile({
					prev: units,
					from: 0,
					to: units.length,
					next: sample,
					equal: ( next, prev )=> typeof next === 'string'
						? land.sand_decode( prev ) === next
						: next.localName === 'span'
							? land.sand_decode( prev ) === next.textContent
								: next.nodeType === next.ATTRIBUTE_NODE
									? land.sand_decode( prev ) === next.localName
									: prev.self() === ( next as Element ).id,
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
					update: ( next, prev, lead )=> land.post(
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
					} else {
						doms.Item( units[i].self() ).dom( sam as Element )
					}
					
				}
				
				return next
				
			} else {
				
				return <>{
					this.units().map( unit => {

						if( unit.tag() === 'solo' ) return null
						
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
				}</>
				
			}
			
		}
		
		html( next?: string ) {
			
			if( next === undefined ) {
				return $mol_dom_serialize( <body>{ this.dom() }</body> )
			} else {
				this.dom( $mol_dom_parse( next ).documentElement )
				return next
			}
			
		}
		
	}
}
