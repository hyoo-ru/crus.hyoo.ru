namespace $ {

	export class $hyoo_crus_list extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
		
		value(
			next?: readonly $hyoo_crus_vary_type[],
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			return this.items( next, tag )
		}
		
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
				drop: ( prev, lead )=> this.land().post( lead?.self() ?? '', prev.head(), prev.self(), null ),
				insert: ( next, lead )=> this.land().post( lead?.self() ?? '', this.head(), land.self_make( $hyoo_crus_area_of( this.head() ) ), next, tag ),
				update: ( next, prev, lead )=> this.land().post( lead?.self() ?? '', prev.head(), prev.self(), next, prev.tag() ),
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
			this.land().post( '', this.head(), '', vary, tag )
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
		
		@ $mol_memo.method
		static of<
			Tip extends keyof typeof $hyoo_crus_vary_tip
		>( tip: Tip ) {

			type Value = ReturnType<typeof $hyoo_crus_vary_cast_funcs[ Tip ]>

			class Narrow extends $hyoo_crus_list {

				static tip = tip;

				@ $mol_mem
				value( next?: readonly Value[] ): readonly Value[] {
					return this.items( next ).map( $hyoo_crus_vary_cast_funcs[ tip ] )
				}

			}

			return Narrow
		}

		static ref< Value extends any >( Value: Value ) {
			
			type Vals = $mol_type_result< $mol_type_result< Value > >[]
			
			class Ref extends (
				$hyoo_crus_list as $mol_type_erase< typeof $hyoo_crus_list, 'value' >
			) {
				
				static Value = Value
				
				static toJSON() {
					return '$hyoo_crus_list.ref(()=>' + ( Value as any )() + ')'
				}
				
				value( next?: Vals ): Vals {
					return this.remote_list( next )
				}
				
				@ $mol_mem
				remote_list( next?: Vals ): Vals {
					const realm = this.realm()
					const Node = ( Value as any )()
					return this.items( next?.map( item => ( item as $hyoo_crus_node ).ref() ) )
						.map( $hyoo_crus_vary_cast_ref )
						.filter( $mol_guard_defined )
						.map( ref => realm!.Node( ref, Node ) )
				}
				
				@ $mol_action
				remote_make( preset = $hyoo_crus_rank_public ): Vals[number] {
					const land = this.realm()!.land_grab( preset )
					this.splice([ land.ref() ])
					return land.Node( ( Value as any )() ).Item('')
				}
				
				@ $mol_action
				local_make( idea?: number ): Vals[number] {
					const area = $hyoo_crus_area_of( this.head() )
					const self = this.land().self_make( area, idea )
					const node = this.land().Node( ( Value as any )() ).Item( self )
					this.splice([ node.ref() ])
					return node
				}
				
			}
			
			return Ref
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
				' ',
				$mol_dev_format_auto( this.items() ),
			)
		}
		
	}

	export class $hyoo_crus_list_bin extends $hyoo_crus_list.of( 'bin' ) {}
	export class $hyoo_crus_list_bool extends $hyoo_crus_list.of( 'bool' ) {}
	export class $hyoo_crus_list_int extends $hyoo_crus_list.of( 'int' ) {}
	export class $hyoo_crus_list_real extends $hyoo_crus_list.of( 'real' ) {}
	export class $hyoo_crus_list_ref extends $hyoo_crus_list.of( 'ref' ) {}
	export class $hyoo_crus_list_str extends $hyoo_crus_list.of( 'str' ) {}
	export class $hyoo_crus_list_time extends $hyoo_crus_list.of( 'time' ) {}
	export class $hyoo_crus_list_json extends $hyoo_crus_list.of( 'json' ) {}
	export class $hyoo_crus_list_jsan extends $hyoo_crus_list.of( 'jsan' ) {}
	export class $hyoo_crus_list_xml extends $hyoo_crus_list.of( 'dom' ) {}
	export class $hyoo_crus_list_tree extends $hyoo_crus_list.of( 'tree' ) {}

}
