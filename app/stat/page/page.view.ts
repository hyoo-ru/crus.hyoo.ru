namespace $.$$ {
	export class $hyoo_crus_app_stat_page extends $.$hyoo_crus_app_stat_page {
		
		@ $mol_mem
		home() {
			const link = new $hyoo_crus_link( this.$.$mol_fetch.text( this.$.$hyoo_crus_glob.yard().master_current() + 'link' ) )
			return this.$.$hyoo_crus_glob.Node( link, $hyoo_crus_app_home )
		}

		@ $mol_mem
		stat() {
			return this.home().stat()
		}
		
		@ $mol_mem
		domain() {
			return this.home().title() ?? super.domain()
		}
		
		@ $mol_mem
		uptime() {
			const status = ( this.stat()?.freshness() ?? Number.POSITIVE_INFINITY ) < 5 ? '🟢' : '🔴' 
			const uptime = this.stat()?.uptime().toString( '#Y #D hh:mm:ss' ) ?? ''
			return `${status} ${uptime}`
		}
		
		@ $mol_mem
		cpu_user() {
			return this.stat()?.Cpu_user()?.series().map( v => 100 * v ) ?? []
		}
		
		@ $mol_mem
		cpu_system() {
			return this.stat()?.Cpu_system()?.series().map( v => 100 * v ) ?? []
		}
		
		@ $mol_mem
		mem_used() {
			return this.stat()?.Mem_used()?.series() ?? []
		}
		
		@ $mol_mem
		mem_free() {
			return this.stat()?.Mem_free()?.series() ?? []
		}
		
		@ $mol_mem
		fs_free() {
			return this.stat()?.Fs_free()?.series() ?? []
		}
		
		@ $mol_mem
		fs_reads() {
			return this.stat()?.Fs_reads()?.series() ?? []
		}
		
		@ $mol_mem
		fs_writes() {
			return this.stat()?.Fs_writes()?.series() ?? []
		}
		
		@ $mol_mem
		port_slaves() {
			return this.stat()?.Port_slaves()?.series() ?? []
		}
		
		@ $mol_mem
		port_masters() {
			return this.stat()?.Port_masters()?.series() ?? []
		}
		
		@ $mol_mem
		times() {
			const times = [] as string[]
			for( let i = 1; i < 59; ++i ) times.push( `${i} secs ago` )
			for( let i = 1; i < 59; ++i ) times.push( `${i} mins ago` )
			for( let i = 1; i < 23; ++i ) times.push( `${i} hours ago` )
			for( let i = 1; i < 364; ++i ) times.push( `${i} days ago` )
			return times
		}
		
	}
}
