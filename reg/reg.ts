
namespace $ {

	export class $hyoo_crus_reg extends $hyoo_crus_node {

		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.head ] as keyof typeof $hyoo_crus_gist_tag;

		pick_unit() {
			return this.units().at(0)
		}
		
		@ $mol_mem
		value_vary( next?: $hyoo_crus_vary_type ): $hyoo_crus_vary_type {
			
			let unit_prev = this.pick_unit()
			let prev = unit_prev ? this.land().gist_decode( unit_prev ) : null
			
			if( next === undefined ) return prev
			if( $mol_compare_deep( prev , next ) ) return next
			
			this.land().post(
				0, 
				unit_prev?.head() ?? this.head(),
				unit_prev?.self() ?? 0,
				next
			)
			
			return this.value_vary()
		}
		
		@ $mol_mem
		value_bool( next?: boolean ): boolean {
			return $hyoo_crus_vary_cast_bool( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_int( next?: bigint ): bigint {
			return $hyoo_crus_vary_cast_int( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_real( next?: number ): number {
			return $hyoo_crus_vary_cast_real( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_str( next?: string ): string {
			return $hyoo_crus_vary_cast_str( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_bin( next?: Uint8Array | null ): Uint8Array | null {
			return $hyoo_crus_vary_cast_bin( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_ref( next?: $hyoo_crus_ref | null ): $hyoo_crus_ref | null {
			const bin = this.value_vary( next )
			return bin instanceof $hyoo_crus_ref ? bin : null
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
		yoke( vary: $hyoo_crus_vary_type ) {
			
			const realm = this.realm()
			
			const ref = this.value_ref()
			if( ref ) return realm!.Lord( ref.lord() ).Land( ref.land() )
			
			const hash = $mol_crypto_hash( $hyoo_crus_vary_encode( vary ).bin )
			const idea = new $mol_buffer( hash.buffer ).uint32(0) + this.land().numb()

			const land = realm!.Lord( this.land().auth().lord() ).Land_new( idea )
			this.value_ref( land.ref() )
			
			return land
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.slug(),
				' ',
				$mol_dev_format_auto( this.value_vary() ),
			)
		}
		
	}

	export function $hyoo_crus_reg_narrow<
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

	export class $hyoo_crus_reg_bin extends $hyoo_crus_reg_narrow( 'bin' ) {}
	export class $hyoo_crus_reg_bool extends $hyoo_crus_reg_narrow( 'bool' ) {}
	export class $hyoo_crus_reg_int extends $hyoo_crus_reg_narrow( 'int' ) {}
	export class $hyoo_crus_reg_real extends $hyoo_crus_reg_narrow( 'real' ) {}
	export class $hyoo_crus_reg_str extends $hyoo_crus_reg_narrow( 'str' ) {}
	export class $hyoo_crus_reg_time extends $hyoo_crus_reg_narrow( 'time' ) {}
	export class $hyoo_crus_reg_json extends $hyoo_crus_reg_narrow( 'json' ) {}
	export class $hyoo_crus_reg_xml extends $hyoo_crus_reg_narrow( 'xml' ) {}
	export class $hyoo_crus_reg_tree extends $hyoo_crus_reg_narrow( 'tree' ) {}

}
