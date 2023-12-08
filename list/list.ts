namespace $ {
	export class $hyoo_crowds_list extends $hyoo_crowds_node {
		
		static tag = $hyoo_crowds_gist_tag[ $hyoo_crowds_gist_tag.vals ] as keyof typeof $hyoo_crowds_gist_tag
		
		static ref< Value extends any >( Value: Value ) {
			
			type Vals = $mol_type_result< $mol_type_result< Value > >[]
			
			class Narrow extends $hyoo_crowds_list {
				
				static Value = Value
				
				static toJSON() {
					return '$hyoo_crowds_list.ref(()=>' + ( Value as any )() + ')'
				}
				
				@ $mol_mem
				remotes( next?: Vals ): Vals {
					const realm = this.realm()
					const Node = ( Value as any )()
					return this.items( next?.map( item => ( item as $hyoo_crowds_node ).ref() ) )
						.map( $hyoo_crowds_vary_cast_ref )
						.map( ref => realm!.Node( Node, ref ) )
				}
				
				@ $mol_action
				remote_make() {
					const land = this.realm()!.home().Land_new( 0 )
					this.splice([ land.ref() ])
					return land.Node( ( Value as any )() ).Item(0)
				}
				
			}
			
			return Narrow
		}
		
		/** Data list representation. */
		@ $mol_mem
		items(
			next?: readonly $hyoo_crowds_vary_type[],
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		): readonly $hyoo_crowds_vary_type[] {
			
			const units = this.units()
			if( next === undefined ) return units.map( unit => this.land().gist_decode( unit ) )
			
			this.splice( next, 0, units.length, tag )
			return this.items()
			
		}
		
		splice(
			next: readonly $hyoo_crowds_vary_type[],
			from = this.units().length,
			to = from,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
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
		
		find( vary: $hyoo_crowds_vary_type ) {
			for( const unit of this.units() ) {
				if( $mol_compare_deep( this.land().gist_decode( unit ), vary ) ) return unit
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
			this.land().post( 0, this.head(), 0, vary, tag )
		}
		
		cut( vary: $hyoo_crowds_vary_type ) {
			
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
		
		node_make< Node extends typeof $hyoo_crowds_node >(
			Node: Node,
			vary: $hyoo_crowds_vary_type,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
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
