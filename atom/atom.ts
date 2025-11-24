
namespace $ {

	/** Atomic dynamic register */
	export class $hyoo_crus_atom_vary extends $hyoo_crus_node {

		static tag = $hyoo_crus_unit_sand_tag[ $hyoo_crus_unit_sand_tag.solo ] as keyof typeof $hyoo_crus_unit_sand_tag;
		
		pick_unit( peer: $hyoo_crus_link | null ) {
			return this.units_of( peer ).at(0)
		}
		
		vary( next?: $hyoo_crus_vary_type ): $hyoo_crus_vary_type {
			return this.vary_of( $hyoo_crus_link.hole, next )
		}
		
		@ $mol_mem_key
		vary_of( peer: $hyoo_crus_link | null, next?: $hyoo_crus_vary_type ): $hyoo_crus_vary_type {
			
			let unit_prev = this.pick_unit( peer )
			let prev = unit_prev ? this.land().sand_decode( unit_prev ) : null
			
			if( next === undefined ) return prev
			if( $mol_compare_deep( prev , next ) ) return next
			
			this.land().post(
				$hyoo_crus_link.hole, 
				unit_prev?.head() ?? this.head(),
				unit_prev?.self() ?? $hyoo_crus_link.hole,
				next,
			)
			
			return this.vary_of( peer )
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
				' ',
				$mol_dev_format_auto( this.vary() ),
			)
		}
		
	}
	

	export class $hyoo_crus_atom_enum_base extends $hyoo_crus_atom_vary {

		static options = [] as readonly $hyoo_crus_vary_type[]
		
	}
	
	export function $hyoo_crus_atom_enum<
		const Options extends readonly $hyoo_crus_vary_type[]
	>( options: Options ) {

		abstract class $hyoo_crus_atom_enum extends $hyoo_crus_atom_enum_base {

			static options = options;

			static toString() {
				return this === $hyoo_crus_atom_enum ? '$hyoo_crus_atom_enum<' + options.map( $hyoo_crus_vary_cast_text ) + '>' : super.toString()
			}
			
			val( next?: Options[number] ): Options[number] | null {
				return this.val_of( $hyoo_crus_link.hole, next )
			}
			
			@ $mol_mem_key
			val_of( peer: $hyoo_crus_link | null, next?: Options[number] ): Options[number] | null {
				
				validate: if( next !== undefined ) {
					for( const option of options ) {
						if( $mol_compare_deep( option, next ) ) break validate
					}
					$mol_fail( new Error( `Wrong value (${ $hyoo_crus_vary_cast_text( next ) })` ) )
				}
				
				const val = this.vary_of( peer, next )
				
				for( const option of options ) {
					if( $mol_compare_deep( option, val ) ) return val
				}
				
				return null
			}

		}

		return $hyoo_crus_atom_enum
	}

	/** Atomic narrowed register factory */
	export function $hyoo_crus_atom<
		Parse extends $mol_data_value
	>( parse: Parse ) {

		abstract class $hyoo_crus_atom extends $hyoo_crus_atom_vary {

			static parse = parse;

			/** Get/Set value of Node field */
			val( next?: ReturnType< Parse > ): ReturnType< Parse > | null {
				return this.val_of( $hyoo_crus_link.hole, next )
			}
			
			@ $mol_mem_key
			val_of( peer: $hyoo_crus_link | null, next?: ReturnType< Parse > ): ReturnType< Parse > | null {
				
				if( next !== undefined ) parse( next )
				
				const res = this.vary_of( peer, next )
				try {
					return parse( res )
				} catch {
					return null
				}
				
			}

			static toString() {
				return this === $hyoo_crus_atom ? '$hyoo_crus_atom<' + this.$.$mol_func_name( parse ) + '>' : super.toString()
			}
			
		}

		return $hyoo_crus_atom
	}
	
	/** Atomic non empty binary register */
	export class $hyoo_crus_atom_blob extends $hyoo_crus_atom( $hyoo_crus_vary_cast_blob ) {}
	/** Atomic boolean register */
	export class $hyoo_crus_atom_bool extends $hyoo_crus_atom( $hyoo_crus_vary_cast_bool ) {}
	/** Atomic int64 register */
	export class $hyoo_crus_atom_bint extends $hyoo_crus_atom( $hyoo_crus_vary_cast_bint ) {}
	/** Atomic float64 register */
	export class $hyoo_crus_atom_real extends $hyoo_crus_atom( $hyoo_crus_vary_cast_real ) {}
	/** Atomic some link register */
	export class $hyoo_crus_atom_link extends $hyoo_crus_atom( $hyoo_crus_vary_cast_link ) {}
	/** Atomic string register */
	export class $hyoo_crus_atom_text extends $hyoo_crus_atom( $hyoo_crus_vary_cast_text ) {}
	/** Atomic iso8601 time moment register*/
	export class $hyoo_crus_atom_time extends $hyoo_crus_atom( $hyoo_crus_vary_cast_time ) {}
	/** Atomic iso8601 time duration register */
	export class $hyoo_crus_atom_dura extends $hyoo_crus_atom( $hyoo_crus_vary_cast_dura ) {}
	/** Atomic iso8601 time interval register */
	export class $hyoo_crus_atom_span extends $hyoo_crus_atom( $hyoo_crus_vary_cast_span ) {}
	/** Atomic plain old js object register */
	export class $hyoo_crus_atom_dict extends $hyoo_crus_atom( $hyoo_crus_vary_cast_dict ) {}
	/** Atomic plain old js array register */
	export class $hyoo_crus_atom_list extends $hyoo_crus_atom( $hyoo_crus_vary_cast_list ) {}
	/** Atomic DOM register */
	export class $hyoo_crus_atom_elem extends $hyoo_crus_atom( $hyoo_crus_vary_cast_elem ) {}
	/** Atomic Tree register */
	export class $hyoo_crus_atom_tree extends $hyoo_crus_atom( $hyoo_crus_vary_cast_tree ) {}
	
	export class $hyoo_crus_atom_link_base extends $hyoo_crus_atom_link {
		
		static Value = $hyoo_crus_dict;
		
	}
	
	/** Atomic link to some Node type register */
	export function $hyoo_crus_atom_link_to< const Value extends any >( Value: Value ) {

		class $hyoo_crus_atom_link_to extends $hyoo_crus_atom_link_base {

			Value = $mol_memo.func( Value as any ) as Value;

			static toString() {
				return this === $hyoo_crus_atom_link_to ? '$hyoo_crus_atom_link_to<' + ( Value as any )() + '>' : super.toString()
			}
			
			/** Target Node */
			remote(
				next?: null | $mol_type_result< $mol_type_result< this['Value'] > >
			): null | $mol_type_result< $mol_type_result< this['Value'] > > {
				return this.remote_of( $hyoo_crus_link.hole, next )
			}
			
			@ $mol_mem_key
			remote_of(
				peer: $hyoo_crus_link | null,
				next?: null | $mol_type_result< $mol_type_result< this['Value'] > >
			): null | $mol_type_result< $mol_type_result< this['Value'] > > {
				
				let link: $hyoo_crus_link | null = ( next as $hyoo_crus_node )?.link() ?? next
				link = $hyoo_crus_vary_cast_link( this.vary_of( peer, link ) )
				if( !link ) return null
				
				return this.$.$hyoo_crus_glob.Node( link, ( Value as any )() )
				
			}
			
			/** Target Node. Creates if not exists. */
			ensure( config?: null | $hyoo_crus_rank_preset | $hyoo_crus_land ) {
				return this.ensure_of( $hyoo_crus_link.hole, config )
			}
			
			ensure_of( peer: $hyoo_crus_link | null, config?: null | $hyoo_crus_rank_preset | $hyoo_crus_land ) {
				
				if( !this.val_of( peer ) ) {
					if( config === null ) this.ensure_here( peer )
					else if( config instanceof $hyoo_crus_land ) this.ensure_area( peer, config )
					else if( config ) this.ensure_lord( peer, config )
					else return null
				}
				
				return this.remote_of( peer )
			}
			
			@ $mol_action
			ensure_here( peer: $hyoo_crus_link | null ) {
				const idea = $mol_hash_string( this.link().str )
				const head = this.land().self_make( idea )
				const node = this.land().Node( ( Value as any )() ).Item( head )
				this.remote_of( peer, node )
			}
			
			@ $mol_action
			ensure_area( peer: $hyoo_crus_link | null, land: $hyoo_crus_land ) {
				const idea = $mol_hash_string( this.link().str )
				const area = land.area_make( idea )
				this.val_of( peer, area.link() )
			}
			
			@ $mol_action
			ensure_lord( peer: $hyoo_crus_link | null, preset: $hyoo_crus_rank_preset ) {
				const land = this.$.$hyoo_crus_glob.land_grab( preset )
				this.val_of( peer, land.link() )
			}
			
			/** @deprecated Use ensure( preset ) */
			remote_ensure( preset?: $hyoo_crus_rank_preset ) {
				return this.ensure( preset )
			}

			/** @deprecated Use ensure( null ) */
			local_ensure() {
				return this.ensure( null )
			}

		}

		return $hyoo_crus_atom_link_to
	}
	
}
