namespace $.$$ {
	export class $hyoo_crus_app_stat_page extends $.$hyoo_crus_app_stat_page {
		
		@ $mol_mem
		stat() {
			const ref = $hyoo_crus_ref( this.$.$mol_fetch.text( this.$.$hyoo_crus_glob.yard().master_current() + 'ref' ) )
			return this.$.$hyoo_crus_glob.Node( ref, $hyoo_crus_app_home ).stat()
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
		fs_used() {
			return this.stat()?.Fs_used()?.series() ?? []
		}
		
		@ $mol_mem
		fs_read() {
			return this.stat()?.Fs_read()?.series() ?? []
		}
		
		@ $mol_mem
		fs_write() {
			return this.stat()?.Fs_write()?.series() ?? []
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
