namespace $.$$ {
	export class $hyoo_crus_auth_slot extends $.$hyoo_crus_auth_slot {
		
		@ $mol_mem
		prefix( next?: string ) {
			return this.$.$mol_state_session.value( `${this}.prefix<>`, next ) ?? ''
		}
		
		@ $mol_mem_key
		found( prefix: string, next?: readonly string[] ) {
			return this.$.$mol_state_local.value( `${this}.found<${ JSON.stringify( prefix ) }>`, next ) ?? []
		}
		
		run() {
			this.running( true )
		}
		
		@ $mol_mem
		running( next = false ) {
			this.prefix()
			return next
		}
		
		run_enabled() {
			return this.prefix().length > 0
		}
		
		@ $mol_mem
		grabbing(): number | null {
			
			if( !this.running() ) return null
			
			const prefix = this.prefix()
			
			try {
				
				const auth = this.$.$hyoo_crus_auth.grab()
				const lord = auth.pass().lord()
				
				if( lord.str.startsWith( prefix ) ) {
					this.found( prefix, [ ... this.found( prefix ), auth.toString() ] )
				}
				
				$mol_wire_watch()
				
				return ( $mol_mem_cached( ()=> this.grabbing() ) ?? 0 ) + 1
				
			} catch( error ) {
				$mol_fail_log( error )
				return $mol_mem_cached( ()=> this.grabbing() ) ?? 0
			}
			
		}
		
		@ $mol_mem
		keys() {
			return this.found( this.prefix() ).map( ( _, i )=> this.Key( i ) ).reverse()
		}
		
		link( index: number ) {
			return $hyoo_crus_auth.from( this.found( this.prefix() )[ index ] ).pass().lord().str
		}
		
		key( index: number ) {
			return this.found( this.prefix() )[ index ].toString()
		}
		
	}
}
