namespace $ {
	export function $hyoo_cras_reg_ref<Value extends any>( Value: Value ) {

		type Val = $mol_type_result<$mol_type_result<Value>>

		class Narrow extends $hyoo_cras_reg {

			static Value = Value;

			static toJSON() {
				return '$hyoo_cras_reg_ref(()=>' + ( Value as any )() + ')'
			}

			@$mol_mem
			remote( next?: null | Val ): null | Val {
				const realm = this.realm()
				const ref = this.value_ref( ( next as $hyoo_cras_node )?.ref() )
				if( !ref ) return null
				return realm!.Lord( ref.lord() ).Land( ref.land() ).Node( ( Value as any )() ).Item( ref.head() )
			}

			@$mol_action
			remote_ensure() {
				this.yoke( this.ref() )
				return this.remote()!
			}

		}

		return Narrow
	}
}
