namespace $ {
	export function $hyoo_crus_reg_ref<Value extends any>( Value: Value ) {

		type Val = $mol_type_result<$mol_type_result<Value>>

		class Narrow extends $hyoo_crus_reg {

			static Value = Value;

			static toJSON() {
				return '$hyoo_crus_reg_ref(()=>' + ( Value as any )() + ')'
			}

			@ $mol_mem
			value( next?: null | Val ): null | Val {
				const realm = this.realm()
				const ref = this.value_str( ( next as $hyoo_crus_node )?.guid() )
				if( !ref ) return null
				return realm!.Node( ref, ( Value as any )() )
			}
			
			@$mol_action
			value_ensure() {
				this.yoke( this.guid() )
				return this.value()!
			}

		}

		return Narrow
	}
}
