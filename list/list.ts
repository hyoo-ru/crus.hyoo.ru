namespace $ {
	export class $hyoo_crus_list extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
		
		/** Data list representation. */
		@ $mol_mem
		items(
			next?: readonly $hyoo_crus_vary_type[],
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		): readonly $hyoo_crus_vary_type[] {
			
			const units = this.units()
			if( next === undefined ) return units.map( unit => this.land().gist_decode( unit ) )
			
			this.splice( next, 0, units.length, tag )
			return this.items()
			
		}
		
		splice(
			next: readonly $hyoo_crus_vary_type[],
			from = this.units().length,
			to = from,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			const land = this.land()
			$mol_reconcile({
				prev: this.units(),
				from,
				to,
				next,
				equal: ( next, prev )=> $mol_compare_deep( this.land().gist_decode( prev ), next ),
				drop: ( prev, lead )=> this.land().post( lead?.self() ?? 0, prev.head(), prev.self(), null ),
				insert: ( next, lead )=> this.land().post( lead?.self() ?? 0, this.head(), land.self_make(), next, tag ),
				update: ( next, prev, lead )=> this.land().post( lead?.self() ?? 0, prev.head(), prev.self(), next, prev.tag() ),
			})
		}
		
		find( vary: $hyoo_crus_vary_type ) {
			for( const unit of this.units() ) {
				if( $mol_compare_deep( this.land().gist_decode( unit ), vary ) ) return unit
			}
			return null
		}
		
		has(
			vary: $hyoo_crus_vary_type,
			next?: boolean,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			if( next === undefined ) return Boolean( this.find( vary ) )
			if( next ) this.add( vary, tag )
			else this.cut( vary )
			return next
		}
		
		add(
			vary: $hyoo_crus_vary_type,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			if( this.has( vary ) ) return
			this.land().post( 0, this.head(), 0, vary, tag )
		}
		
		cut( vary: $hyoo_crus_vary_type ) {
			
			const units = [ ... this.units() ]
			for( let i = 0; i < units.length; ++ i ) {
				
				if( ! $mol_compare_deep( this.land().gist_decode( units[i] ), vary ) ) continue
				
				this.land().post(
					units[i-1]?.self() ?? 0,
					units[i].head(),
					units[i].self(),
					null,
				)
				
				units.splice( i, 1 )
				-- i
				
			}
			
		}
		
		move( from: number, to: number ) {
			this.land().gist_move( this.units()[ from ], this.head(), to )
		}
		
		wipe( seat: number ) {
			this.land().gist_wipe( this.units()[ seat ] )
		}
		
		node_make< Node extends typeof $hyoo_crus_node >(
			Node: Node,
			vary: $hyoo_crus_vary_type,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			this.splice( [ vary ], undefined, undefined, tag )
			return this.land().Node( Node ).Item( this.units().at(-1)!.self() )
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.slug(),
				' ',
				$mol_dev_format_auto( this.items() ),
			)
		}
		
	}
}
