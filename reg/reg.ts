namespace $ {
	type Resolve< Decl >
	= Decl extends (new() => any) ? InstanceType< Decl > : Decl extends ()=> any ? InstanceType< ReturnType< Decl > > : Decl

	export class $hyoo_crowds_reg extends $hyoo_crowds_node {
		
		static tag = $hyoo_crowds_gist_tag[ $hyoo_crowds_gist_tag.head ] as keyof typeof $hyoo_crowds_gist_tag
		
		@ $mol_mem_key
		static of<
			Tip extends keyof typeof $hyoo_crowds_vary_tip
		>( tip: Tip ) {
			
			type Value = ReturnType< typeof $hyoo_crowds_vary_cast_funcs[ Tip ] >
			
			class Narrow extends $hyoo_crowds_reg {
				
				static tip = tip
				
				@ $mol_mem
				value( next?: Value ): Value {
					return $hyoo_crowds_vary_cast_funcs[ tip ]( this.value_vary( next ) ) as any
				}
				
			}
			
			return Narrow
		}
		
		static ref< Value extends any >( Value: Value ) {
			
			type Val = $mol_type_result< $mol_type_result< Value > >
			
			class Narrow extends $hyoo_crowds_reg {
				
				static Value = Value
				
				static toJSON() {
					return '$hyoo_crowds_reg.ref(()=>' + ( Value as any )() + ')'
				}
				
				@ $mol_mem
				value( next?: null | Val ): null | Val {
					const realm = this.realm()
					const ref = this.value_ref( ( next as $hyoo_crowds_node )?.ref() )
					if( !ref ) return null
					return realm!.Lord( ref.lord() ).Land( ref.land() ).Node( ( Value as any )() ).Item( ref.head() )
				}
				
				@ $mol_action
				ensure() {
					this.yoke( this.ref() )
					return this.value()!
				}
				
			}
			
			return Narrow
		}
		
		pick_unit() {
			return this.units().at(0)
		}
		
		@ $mol_mem
		value_vary( next?: $hyoo_crowds_vary_type ): $hyoo_crowds_vary_type {
			
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
			return $hyoo_crowds_vary_cast_bool( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_int( next?: bigint ): bigint {
			return $hyoo_crowds_vary_cast_int( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_real( next?: number ): number {
			return $hyoo_crowds_vary_cast_real( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_str( next?: string ): string {
			return $hyoo_crowds_vary_cast_str( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_bin( next?: Uint8Array | null ): Uint8Array | null {
			return $hyoo_crowds_vary_cast_bin( this.value_vary( next ) )
		}
		
		@ $mol_mem
		value_ref( next?: $hyoo_crowds_ref | null ): $hyoo_crowds_ref | null {
			const bin = this.value_vary( next )
			return bin instanceof $hyoo_crowds_ref ? bin : null
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
		yoke( vary: $hyoo_crowds_vary_type ) {
			
			const realm = this.realm()
			
			const ref = this.value_ref()
			if( ref ) return realm!.Lord( ref.lord() ).Land( ref.land() )
			
			const hash = $mol_crypto_hash( $hyoo_crowds_vary_encode( vary ).bin )
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
}
