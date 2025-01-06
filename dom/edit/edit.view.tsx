/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $.$$ {
	export class $hyoo_crus_dom_edit extends $.$hyoo_crus_dom_edit {

		dom_id() {
			return ""
		}

		editable() {
			return this.enabled() ? 'true' : 'false'
		}

		@ $mol_mem
		sub() {
			console.log('render')
			let nodes = $mol_jsx_attach( $mol_dom_context.document, ()=> this.node().dom() ) as ChildNode[]
			nodes = this.$.$mol_dom_safe( nodes )
			return nodes.length ? nodes : [ <p><br/></p> ]
		}

		@ $mol_mem
		selection( next?: readonly( readonly[ string /*self*/, number /*pos*/ ] )[] ) {
			return this.node().selection( this.$.$hyoo_crus_auth.current().lord(), next )
		}

		save() {
			let nodes = [ ... this.dom_node().childNodes ]
			nodes = this.$.$mol_dom_safe( nodes )
			this.node().dom( nodes as Element[] )
			this.selection_save()
		}

		@ $mol_mem
		selection_sync() {
			return new this.$.$mol_dom_listener(
				$mol_dom_context.document,
				'selectionchange',
				event => this.selection_save(),
			)
		}

		selection_save() {

			const sel = $mol_dom_range.from_selection()
			const root = this.dom_node()
			if( !$mol_dom_range.inside( root ).range_contains( sel ) ) return

			const anchor = [ sel.anchor.node.parentElement!.id, sel.anchor.pos ] as const
			const extend = [ sel.extend.node.parentElement!.id, sel.extend.pos ] as const
			console.log( 'save', anchor, extend )
			this.selection([ anchor, extend ])

		}

		// @ $mol_mem
		selection_load() {
			if( !this.focused() ) return
			const [ anchor, focus ] = this.selection()
			console.log( 'load', anchor, focus )
			const anchorNode = $mol_dom_context.document.getElementById( anchor[0] )?.firstChild
			const extendNode = $mol_dom_context.document.getElementById( focus[0] )?.firstChild
			if( !anchorNode ) return
			if( !extendNode ) return
			const range = new $mol_dom_range(
				$mol_dom_point.head( anchorNode ).move_chars( this.dom_node(), anchor[1] ),
				$mol_dom_point.head( extendNode ).move_chars( this.dom_node(), focus[1] ),
			)
			console.log(anchorNode,range)
			range.select()
		}

		// @ $mol_mem
		// saving() {
		// 	const obs = new MutationObserver( $mol_wire_async( ()=> {
		// 		console.log(1)
		// 		this.node().dom( this.Body() )
		// 	} ) )
		// 	obs.observe( this.Body(), { attributes: true, childList: true, subtree: true, characterData: true } )
		// }

		toggle( Type: 'strong' | 'em' | 'ins' | 'del' | 'code', event: KeyboardEvent ) {
			console.log( 'toggle', Type )
			
			$mol_dom_range.from_selection().surround( <Type></Type> )
			this.save()
			event.preventDefault()
		}

	}
}
