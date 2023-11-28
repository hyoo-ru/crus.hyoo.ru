namespace $ {
	export class $hyoo_crowds_dict extends $hyoo_crowds_node {
		
		static tag = 'dict' as keyof typeof $hyoo_crowds_gist_tag
		
		@ $mol_mem
		keys(): readonly $hyoo_crowds_vary_type[] {
			return this.cast( $hyoo_crowds_list ).items()
		}
		
		has(
			key: $hyoo_crowds_vary_type,
			next?: false,
		) {
			return this.cast( $hyoo_crowds_list ).has( key, next, 'head' )
		}
		
		dive< Node extends typeof $hyoo_crowds_node >( key: $hyoo_crowds_vary_type, Node: Node ) {
			this.cast( $hyoo_crowds_list ).has( key, true, Node.tag )
			const unit = this.cast( $hyoo_crowds_list ).find( key )!
			return this.area().Node( Node ).Item( unit.self() )
		}
		
		;[ $mol_dev_format_head ]() {
			const nodes = this.nodes(null)
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.guid(),
				' ',
				$mol_dev_format_auto( this.keys().map( ( key, index )=> new Pair( key, nodes[ index ] ) ) ),
			)
		}
		
	}
	
	class Pair {
		constructor( readonly key: any, readonly val: any ) {
		}
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_tr( {} ,
				$mol_dev_format_td( {}, $mol_dev_format_auto(this.key) ),
				$mol_dev_format_td( {},': '),
				$mol_dev_format_td( {}, $mol_dev_format_auto(this.val) ),
			)
		}
	}
	
}
