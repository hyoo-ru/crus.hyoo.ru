namespace $.$$ {
	export class $hyoo_crus_status extends $.$hyoo_crus_status {
		
		@ $mol_mem
		message() {
			
			try {
				
				this.$.$hyoo_crus_glob.yard().master()
				// this.glob().yard().sync()
				return this.hint()
			
			} catch( error ) {
				if( error instanceof Promise ) $mol_fail_hidden( error )
				
				$mol_fail_log( error )
				return String( error )
				
			}
			
		}
		
		@ $mol_mem
		link_content() {
			
			try {
				
				this.$.$hyoo_crus_glob.yard().master()
				// this.glob().yard().sync()
				return [ this.Well() ]
			
			} catch( error ) {
				if( error instanceof Promise ) $mol_fail_hidden( error )
				
				$mol_fail_log( error )
				return [ this.Fail() ]
				
			}
			
		}
		
		// @ $mol_mem
		// hint() {
		// 	return super.hint() + ' ' + $hyoo_sync_revision
		// }
		
		options() {
			return this.$.$hyoo_crus_yard.masters
		}
		
		@ $mol_mem
		master_link() {
			return this.$.$hyoo_crus_glob.yard().master_current()
		}
		
		master_id( uri: string ) {
			return uri.replace( /^\w+:\/\//, '' ).replace( /\/$/, '' )
		}
		
		option_label( uri: string ) {
			return uri.replace( /^\w+:\/\//, '' ).replace( /\/$/, '' )
		}
		
		value( next?: string ) {
			return this.$.$hyoo_crus_yard.masters[
				this.$.$hyoo_crus_glob.yard().master_cursor(
					next == undefined ? undefined : this.$.$hyoo_crus_yard.masters.indexOf( next )
				)
			]
		}
		
	}
}
