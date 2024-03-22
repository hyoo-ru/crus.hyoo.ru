namespace $ {

	/** Reactive convergent list. */
	export class $hyoo_crus_list_vary extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
		
		value(
			next?: readonly $hyoo_crus_vary_type[],
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			return this.items( next, tag )
		}
		
		/** All Vary in the list. */
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
		
		/** Replace sublist by  new one with reconcilation. */
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
		
		/** Unit by Vary. */
		find( vary: $hyoo_crus_vary_type ) {
			for( const unit of this.units() ) {
				if( $mol_compare_deep( this.land().gist_decode( unit ), vary ) ) return unit
			}
			return null
		}
		
		/** Existance of Vary in the list. */
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
		
		/** Add Vary a the beginnig if it doesn't exists. */
		add(
			vary: $hyoo_crus_vary_type,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			if( this.has( vary ) ) return
			this.land().post( '', this.head(), '', vary, tag )
		}
		
		/** Removes all Vary presence. */
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
		
		/** Moves item from one Seat to another. */
		move( from: number, to: number ) {
			this.land().gist_move( this.units()[ from ], this.head(), to )
		}
		
		/** Remove item by Seat. */
		wipe( seat: number ) {
			this.land().gist_wipe( this.units()[ seat ] )
		}
		
		/** Add vary at the end and use maked Self as Node Head. */
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
				this.head(),
				' ',
				$mol_dev_format_auto( this.items() ),
			)
		}
		
	}

	export function $hyoo_crus_list<
		Parse extends $mol_data_value
	>( parse: Parse ) {

		abstract class Narrow extends $hyoo_crus_list_vary {

			static parse = parse;

			@ $mol_mem
			value( next?: readonly ReturnType< Parse >[] ): readonly ReturnType< Parse >[] {
				return this.items( next?.map( parse ) ).map( parse )
			}

		}

		return Narrow
	}

	export class $hyoo_crus_list_bin extends $hyoo_crus_list( $hyoo_crus_vary_cast_bin ) {}
	export class $hyoo_crus_list_bool extends $hyoo_crus_list( $hyoo_crus_vary_cast_bool ) {}
	export class $hyoo_crus_list_int extends $hyoo_crus_list( $hyoo_crus_vary_cast_int ) {}
	export class $hyoo_crus_list_real extends $hyoo_crus_list( $hyoo_crus_vary_cast_real ) {}
	export class $hyoo_crus_list_ref extends $hyoo_crus_list( $hyoo_crus_vary_cast_ref ) {}
	
	export class $hyoo_crus_list_str extends $hyoo_crus_list( $hyoo_crus_vary_cast_str ) {}
	export class $hyoo_crus_list_time extends $hyoo_crus_list( $hyoo_crus_vary_cast_time ) {}
	export class $hyoo_crus_list_dur extends $hyoo_crus_list( $hyoo_crus_vary_cast_dur ) {}
	export class $hyoo_crus_list_range extends $hyoo_crus_list( $hyoo_crus_vary_cast_range ) {}
	export class $hyoo_crus_list_json extends $hyoo_crus_list( $hyoo_crus_vary_cast_json ) {}
	export class $hyoo_crus_list_jsan extends $hyoo_crus_list( $hyoo_crus_vary_cast_jsan ) {}
	export class $hyoo_crus_list_xml extends $hyoo_crus_list( $hyoo_crus_vary_cast_dom ) {}
	export class $hyoo_crus_list_tree extends $hyoo_crus_list( $hyoo_crus_vary_cast_tree ) {}

	export function $hyoo_crus_list_ref_to< Value extends any >( Value: Value ) {
			
		type Vals = readonly $mol_type_result< $mol_type_result< Value > >[]
		
		class Ref extends (
			$hyoo_crus_list_vary as $mol_type_erase< typeof $hyoo_crus_list_vary, 'value' >
		) {
			
			static Value = Value
			
			static toJSON() {
				return '$hyoo_crus_list_to(()=>' + ( Value as any )() + ')'
			}
			
			value( next?: Vals ): Vals {
				return this.remote_list( next )
			}
			
			/** List of referenced Nodes */
			@ $mol_mem
			remote_list( next?: Vals ): Vals {
				const realm = this.realm()
				const Node = ( Value as any )()
				return this.items( next?.map( item => ( item as $hyoo_crus_node ).ref() ) )
					.map( $hyoo_crus_vary_cast_ref )
					.filter( $mol_guard_defined )
					.map( ref => realm!.Node( ref, Node ) )
			}
			
			/** Add new Node which placed in new Land */
			@ $mol_action
			remote_make( preset: $hyoo_crus_rank_preset ): Vals[number] {
				const land = this.realm()!.land_grab( preset )
				this.splice([ land.ref() ])
				return land.Node( ( Value as any )() ).Item('')
			}
			
			/** Add new Node which placed in same Land */
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
	
}
