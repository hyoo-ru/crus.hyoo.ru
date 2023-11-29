namespace $ {
	export class $hyoo_crowds_list extends $hyoo_crowds_node {
		
		static tag = 'list' as keyof typeof $hyoo_crowds_gist_tag
		
		/** Data list representation. */
		@ $mol_mem
		items(
			next?: readonly $hyoo_crowds_vary_type[],
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		): readonly $hyoo_crowds_vary_type[] {
			
			const units = this.units()
			if( next === undefined ) return units.map( unit => this.area().gist_decode( unit ) )
			
			this.splice( next, 0, units.length, tag )
			return this.items()
			
		}
		
		splice(
			next: readonly $hyoo_crowds_vary_type[],
			from = this.units().length,
			to = from,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			const area = this.area()
			$mol_reconcile({
				prev: this.units(),
				from,
				to,
				next,
				equal: ( next, prev )=> $mol_compare_deep( this.area().gist_decode( prev ), next ),
				drop: ( prev, lead )=> this.area().post( lead?.self() ?? 0, prev.head(), prev.self(), null ),
				insert: ( next, lead )=> this.area().post( lead?.self() ?? 0, this.head(), area.self_make(), next, tag ),
				update: ( next, prev, lead )=> this.area().post( lead?.self() ?? 0, prev.head(), prev.self(), next, prev.tag() ),
			})
		}
		
		find( vary: $hyoo_crowds_vary_type ) {
			for( const unit of this.units() ) {
				if( $mol_compare_deep( this.area().gist_decode( unit ), vary ) ) return unit
			}
			return null
		}
		
		has(
			vary: $hyoo_crowds_vary_type,
			next?: boolean,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			if( next === undefined ) return Boolean( this.find( vary ) )
			if( next ) this.add( vary, tag )
			else this.cut( vary )
			return next
		}
		
		add(
			vary: $hyoo_crowds_vary_type,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			if( this.has( vary ) ) return
			this.area().post( 0, this.head(), 0, vary, tag )
		}
		
		cut( vary: $hyoo_crowds_vary_type ) {
			
			const units = [ ... this.units() ]
			for( let i = 0; i < units.length; ++ i ) {
				
				if( ! $mol_compare_deep( this.area().gist_decode( units[i] ), vary ) ) continue
				
				this.area().post(
					units[i-1]?.self() ?? 0,
					units[i].head(),
					units[i].self(),
					null,
				)
				
				units.splice( i, 1 )
				-- i
				
			}
			
		}
		
		node_make< Node extends typeof $hyoo_crowds_node >(
			Node: Node,
			vary: $hyoo_crowds_vary_type,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			this.splice( [ vary ], undefined, undefined, tag )
			return this.area().Node( Node ).Item( this.units().at(-1)!.self() )
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.guid(),
				' ',
				$mol_dev_format_auto( this.items() ),
			)
		}
		
	}
}
