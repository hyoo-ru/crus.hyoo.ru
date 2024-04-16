
namespace $ {

	export class $hyoo_crus_atom_vary extends $hyoo_crus_node {

		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.solo ] as keyof typeof $hyoo_crus_gist_tag;
		
		pick_unit() {
			return this.units().at(0)
		}
		
		@ $mol_mem
		vary( next?: $hyoo_crus_vary_type ): $hyoo_crus_vary_type {
			
			let unit_prev = this.pick_unit()
			let prev = unit_prev ? this.land().gist_decode( unit_prev ) : null
			
			if( next === undefined ) return prev
			if( $mol_compare_deep( prev , next ) ) return next
			
			this.land().post(
				'', 
				unit_prev?.head() ?? this.head(),
				unit_prev?.self() ?? '',
				next
			)
			
			return this.vary()
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

		abstract class Narrow extends $hyoo_crus_atom_enum_base {

			static options = options;

			@ $mol_mem
			val( next?: Options[number] ): Options[number] | null {
				
				validate: if( next !== undefined ) {
					for( const option of options ) {
						if( $mol_compare_deep( option, next ) ) break validate
					}
					$mol_fail( new Error( `Wrong value (${ $hyoo_crus_vary_cast_str( next ) })` ) )
				}
				
				const val = this.vary( next )
				
				for( const option of options ) {
					if( $mol_compare_deep( option, val ) ) return val
				}
				
				return null
			}

		}

		return Narrow
	}

	export function $hyoo_crus_atom<
		Parse extends $mol_data_value
	>( parse: Parse ) {

		abstract class Narrow extends $hyoo_crus_atom_vary {

			static parse = parse;

			val( next?: ReturnType< Parse > ): ReturnType< Parse > | null {
				
				if( next !== undefined ) parse( next )
				
				const res = this.vary( next )
				try {
					return parse( res )
				} catch {
					return null
				}
				
			}

		}

		return Narrow
	}
	
	export class $hyoo_crus_atom_bin extends $hyoo_crus_atom( $hyoo_crus_vary_cast_bin ) {}
	export class $hyoo_crus_atom_bool extends $hyoo_crus_atom( $hyoo_crus_vary_cast_bool ) {}
	export class $hyoo_crus_atom_int extends $hyoo_crus_atom( $hyoo_crus_vary_cast_int ) {}
	export class $hyoo_crus_atom_real extends $hyoo_crus_atom( $hyoo_crus_vary_cast_real ) {}
	export class $hyoo_crus_atom_ref extends $hyoo_crus_atom( $hyoo_crus_vary_cast_ref ) {}
	
	export class $hyoo_crus_atom_str extends $hyoo_crus_atom( $hyoo_crus_vary_cast_str ) {}
	export class $hyoo_crus_atom_time extends $hyoo_crus_atom( $hyoo_crus_vary_cast_time ) {}
	export class $hyoo_crus_atom_dur extends $hyoo_crus_atom( $hyoo_crus_vary_cast_dur ) {}
	export class $hyoo_crus_atom_range extends $hyoo_crus_atom( $hyoo_crus_vary_cast_range ) {}
	
	export class $hyoo_crus_atom_json extends $hyoo_crus_atom( $hyoo_crus_vary_cast_json ) {}
	export class $hyoo_crus_atom_jsan extends $hyoo_crus_atom( $hyoo_crus_vary_cast_jsan ) {}
	export class $hyoo_crus_atom_dom extends $hyoo_crus_atom( $hyoo_crus_vary_cast_dom ) {}
	export class $hyoo_crus_atom_tree extends $hyoo_crus_atom( $hyoo_crus_vary_cast_tree ) {}
	
	export class $hyoo_crus_atom_ref_base extends $hyoo_crus_atom_ref {
		
		static Value = $hyoo_crus_dict;
		
	}
	
	export function $hyoo_crus_atom_ref_to< const Value extends any >( Value: Value ) {

		class Ref extends $hyoo_crus_atom_ref_base {

			Value = Value;

			static toString() {
				return '$hyoo_crus_atom_ref_to<' + ( Value as any )() + '>'
			}
			
			@ $mol_mem
			yoke( preset?: $hyoo_crus_rank_preset ) {
				
				const realm = this.realm()!
				const Ref = this.cast( $hyoo_crus_atom_ref )
				const ref = Ref.val()
				if( ref ) return realm.Land( ref )
				if( preset === undefined ) return null
				
				const land = realm.land_grab( preset )
				Ref.val( land.ref() )
				
				return land
			}
			
			@ $mol_mem
			remote(
				next?: null | $mol_type_result< $mol_type_result< this['Value'] > >
			): null | $mol_type_result< $mol_type_result< this['Value'] > > {
				
				const realm = this.realm()
				
				let ref: $hyoo_crus_ref | null = ( next as $hyoo_crus_node )?.ref() ?? next
				ref = $hyoo_crus_vary_cast_ref( this.vary( ref ) )
				if( !ref ) return null
				
				return realm!.Node( ref, ( Value as any )() )
				
			}
			
			// @ $mol_mem
			remote_ensure( preset?: $hyoo_crus_rank_preset ) {
				this.yoke( preset )
				return this.remote()
			}

			@ $mol_mem
			local_ensure() {
				if( this.remote() ) return this.remote()!
				const node = this.land().Node( ( Value as any )() ).Item( this.land().self_make( $hyoo_crus_area_of( this.head() ) ) )
				return this.remote( node )
			}

		}

		return Ref
	}
	
}
