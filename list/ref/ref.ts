namespace $ {
	export function $hyoo_crus_list_ref< Value extends any >( Value: Value ) {
			
		type Vals = $mol_type_result< $mol_type_result< Value > >[]
		
		class Narrow extends $hyoo_crus_list {
			
			static Value = Value
			
			static toJSON() {
				return '$hyoo_crus_list_ref(()=>' + ( Value as any )() + ')'
			}
			
			@ $mol_mem
			value( next?: Vals ): Vals {
				const realm = this.realm()
				const Node = ( Value as any )()
				return this.items( next?.map( item => ( item as $hyoo_crus_node ).guid() ) )
					.map( ref => realm!.Node( Node, ref as string ) )
			}
			
			@ $mol_action
			value_add() {
				const land = this.realm()!.home().Land_new( 0 )
				this.splice([ land.guid() ])
				return land.Node( ( Value as any )() ).Item('')
			}
			
		}
		
		return Narrow
	}
}
