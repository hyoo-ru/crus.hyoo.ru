namespace $ {
	
	export class $hyoo_crus_app_home_node extends $hyoo_crus_app_home {
		
		@ $mol_mem
		init() {
			this.title( $node.os.hostname() )
			this.Aliases(null)!.items( this.aliases() )
		}
		
		@ $mol_mem
		tick() {
			this.$.$mol_state_time.now( 1000 )
			this.uptime( BigInt( Math.floor( process.uptime() ) ) )
		}
		
		@ $mol_mem
		ips() {
			const ips = [] as string[]
			for( const group of Object.values( $node.os.networkInterfaces() ) ) {
				for( const face of group! ) {
					ips.push( face.address )
				}
			}
			return ips
		}
		
		async lookup( ip: string ) {
			const lookup = $node.util.promisify( $node.dns.lookupService )
			try {
				return (await lookup( ip, 80 )).hostname
			} catch( error ) {
				$mol_fail_log( error )
				return ip
			}
		}
		
		@ $mol_mem
		aliases() {
			const self = $mol_wire_sync( this )
			return [ ... new Set( this.ips().map( ip => self.lookup( ip ) ) ) ]
		}
		
	}
	
	$.$hyoo_crus_app_home = $hyoo_crus_app_home_node
	
}
