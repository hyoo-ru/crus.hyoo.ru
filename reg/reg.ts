
namespace $ {

	export class $hyoo_crus_reg extends $hyoo_crus_node {

		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.solo ] as keyof typeof $hyoo_crus_gist_tag;

		pick_unit() {
			return this.units().at(0)
		}
		
		value( next?: $hyoo_crus_vary_type ) {
			return this.value_vary( next )
		}
		
		@ $mol_mem
		value_vary( next?: $hyoo_crus_vary_type ): $hyoo_crus_vary_type {
			
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
			
			return this.value_vary()
		}
		
		@ $mol_mem
		value_bool( next?: boolean ): boolean | null {
			return $hyoo_crus_vary_cast_bool( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_int( next?: bigint ): bigint | null {
			return $hyoo_crus_vary_cast_int( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_real( next?: number ): number | null {
			return $hyoo_crus_vary_cast_real( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_str( next?: string ): string | null {
			return $hyoo_crus_vary_cast_str( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_bin( next?: Uint8Array | null ): Uint8Array | null {
			return $hyoo_crus_vary_cast_bin( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_ref( next?: typeof $hyoo_crus_ref.Value ): typeof $hyoo_crus_ref.Value | null {
			return $hyoo_crus_vary_cast_ref( this.value_vary( next ) )
		}
		
		@ $mol_mem_key
		value_as< Decode extends $mol_data_value >( decode: Decode, next?: ReturnType< Decode > ) {
			if( next === undefined ) {
				
				try {
					// return $mol_func_is_class( decode ) ? decode( this.value_str() ) : decode( this.value_str() )
					return decode( this.value_str() )
				} catch( error ) {
					this.$.$mol_fail_log( error )
					return null
				}
				
			} else {
				
				const str = `${ next }`
				const res = decode( str )
				this.value_vary( str )
				return res
				
			}
		}
		
		@ $mol_mem_key
		yoke( vary: $hyoo_crus_vary_type, auto?: any ) {
			
			const realm = this.realm()
			
			const ref = this.value_ref()
			if( ref ) return realm!.Land( ref )
			if( auto === undefined ) return null
			
			const hash = $mol_crypto_hash( $hyoo_crus_vary_encode( vary ).bin )
			const numb = new Uint16Array( $mol_base64_decode( this.land().numb() ).buffer )
			const idea = new $mol_buffer( hash.buffer ).uint32(0) + numb[0] + numb[1] * 2**16 + numb[2] * 2**32

			const land = realm!.Lord( this.land().auth().lord() ).Land_new( idea )
			this.value_ref( land.ref() )
			
			return land
		}
		
		@ $mol_memo.method
		static of<
			Tip extends keyof typeof $hyoo_crus_vary_tip
		>( tip: Tip ) {

			type Value = ReturnType<typeof $hyoo_crus_vary_cast_funcs[ Tip ]>

			class Narrow extends $hyoo_crus_reg {

				static tip = tip;

				@$mol_mem
				value( next?: Value ): Value {
					return $hyoo_crus_vary_cast_funcs[ tip ]( this.value_vary( next ) ) as any
				}

			}

			return Narrow
		}

		static ref< Value extends any >( Value: Value ) {

			type Val = $mol_type_result< $mol_type_result< Value > >
	
			class Ref extends (
				$hyoo_crus_reg as $mol_type_erase< typeof $hyoo_crus_reg, 'value' >
			) {
	
				static Value = Value;
	
				static toString() {
					return '$hyoo_crus_reg.ref(()=>' + ( Value as any )() + ')'
				}
				
				value( next?: null | Val ): null | Val {
					return this.remote( next )
				}
	
				@ $mol_mem
				remote( next?: null | Val ): null | Val {
					const realm = this.realm()
					const ref = this.value_ref( ( next as $hyoo_crus_node )?.ref() )
					if( !ref ) return null
					return realm!.Node( ref, ( Value as any )() )
				}
				
				@ $mol_action
				remote_ensure() {
					this.yoke( this.ref(), null )
					return this.remote()!
				}
	
				@ $mol_action
				local_ensure() {
					if( this.value_ref() ) return this.remote()!
					const node = this.land().Node( ( Value as any )() ).Item( this.land().self_make( $hyoo_crus_area_of( this.head() ) ) )
					return this.remote( node )!
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
				$mol_dev_format_auto( this.value_vary() ),
			)
		}
		
	}

	export class $hyoo_crus_reg_bin extends $hyoo_crus_reg.of( 'bin' ) {}
	export class $hyoo_crus_reg_bool extends $hyoo_crus_reg.of( 'bool' ) {}
	export class $hyoo_crus_reg_int extends $hyoo_crus_reg.of( 'int' ) {}
	export class $hyoo_crus_reg_real extends $hyoo_crus_reg.of( 'real' ) {}
	export class $hyoo_crus_reg_ref extends $hyoo_crus_reg.of( 'ref' ) {}
	export class $hyoo_crus_reg_str extends $hyoo_crus_reg.of( 'str' ) {}
	export class $hyoo_crus_reg_time extends $hyoo_crus_reg.of( 'time' ) {}
	export class $hyoo_crus_reg_json extends $hyoo_crus_reg.of( 'json' ) {}
	export class $hyoo_crus_reg_jsan extends $hyoo_crus_reg.of( 'jsan' ) {}
	export class $hyoo_crus_reg_xml extends $hyoo_crus_reg.of( 'dom' ) {}
	export class $hyoo_crus_reg_tree extends $hyoo_crus_reg.of( 'tree' ) {}

}
