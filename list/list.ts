namespace $ {
	export class $hyoo_crus_list extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
		
		value() {
			return this
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
				insert: ( next, lead )=> this.land().post( lead?.self() ?? '', this.head(), land.self_make(), next, tag ),
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
		
		static ref< Value extends any >( Value: Value ) {
			
			type Vals = $mol_type_result< $mol_type_result< Value > >[]
			
			class Ref extends (
				$hyoo_crus_list as Omit< typeof $hyoo_crus_list, 'prototype' > & {
					new(): Omit< $hyoo_crus_list, 'value' >
				}
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
						.map( ref => realm!.Node( $hyoo_crus_vary_cast_ref( ref ), Node ) )
				}
				
				@ $mol_action
				remote_make(): Vals[number] {
					const land = this.realm()!.home().Land_new( 0 )
					this.splice([ land.ref() ])
					return land.Node( ( Value as any )() ).Item('')
				}
				
				@ $mol_action
				local_make(): Vals[number] {
					const node = this.land().Node( ( Value as any )() ).Item( this.land().self_make() )
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
}
