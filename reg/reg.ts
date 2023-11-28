namespace $ {
	export class $hyoo_crowds_reg extends $hyoo_crowds_node {
		
		static tag = 'head' as keyof typeof $hyoo_crowds_gist_tag
		
		pick_unit() {
			return this.units().at(0)
		}
		
		@ $mol_mem
		value( next?: $hyoo_crowds_vary_type ): $hyoo_crowds_vary_type {
			
			let unit_prev = this.pick_unit()
			let prev = unit_prev ? this.area().gist_decode( unit_prev ) : null
			
			if( next === undefined ) return prev
			if( $mol_compare_deep( prev , next ) ) return next
			
			this.area().post(
				0, 
				unit_prev?.head() ?? this.head(),
				unit_prev?.self() ?? 0,
				next
			)
			
			return this.value()
		}
		
		@ $mol_mem
		value_bool( next?: boolean ): boolean {
			return Boolean( this.value( next ) )
		}
		
		@ $mol_mem
		value_int( next?: bigint ): bigint {
			
			let val = this.value( next )
			
			switch( typeof val ) {
				case 'boolean': return BigInt( val )
				case 'bigint': return val
				case 'number': return BigInt( Number.isFinite( val ) ? Math.trunc( val ) : 0n )
				case 'string':
					try {
						return BigInt( val ?? 0n )
					} catch {
						return 0n
					}
			}
			
			if( val instanceof $hyoo_crowds_node_ref ) return val.lord
			if( val instanceof Uint8Array ) return 0n
			
			return 0n
		}
		
		@ $mol_mem
		value_real( next?: number ): number {
			const val = this.value( next ) 
			if( typeof val === 'string' ) return Number( val || Number.NaN )
			return Number( val ?? Number.NaN )
		}
		
		@ $mol_mem
		value_str( next?: string ): string {
			return String( this.value( next ) ?? '' )
		}
		
		@ $mol_mem
		value_bin( next?: Uint8Array | null ): Uint8Array | null {
			const bin = this.value( next )
			return bin instanceof Uint8Array ? bin : null
		}
		
		@ $mol_mem
		value_ref( next?: $hyoo_crowds_node_ref | null ): $hyoo_crowds_node_ref | null {
			const bin = this.value( next )
			return bin instanceof $hyoo_crowds_node_ref ? bin : null
		}
		
		@ $mol_mem_key
		value_as< Decode extends $mol_data_value >( decode: Decode, next?: ReturnType< Decode > ) {
			if( next === undefined ) {
				
				try {
					return decode( this.value_str() )
				} catch( error ) {
					this.$.$mol_fail_log( error )
					return null
				}
				
			} else {
				
				const str = `${ next }`
				const res = decode( str )
				this.value( str )
				return res
				
			}
		}
		
		@ $mol_mem_key
		yoke( vary: $hyoo_crowds_vary_type ) {
			
			const realm = this.realm()
			
			const ref = this.value_ref()
			if( ref ) return realm!.Land( ref.lord ).Area( ref.numb )
			
			const hash = $mol_crypto_hash( $hyoo_crowds_vary_encode( vary ).bin )
			const idea = new $mol_buffer( hash.buffer ).uint32(0) + this.area().numb()

			const area = realm!.Land( this.area().auth().lord() ).Area_new( idea )
			this.value_ref( area.ref() )
			
			return area
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.guid(),
				' ',
				$mol_dev_format_auto( this.value() ),
			)
		}
		
	}
}
