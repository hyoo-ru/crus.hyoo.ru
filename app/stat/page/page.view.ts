namespace $.$$ {
	export class $hyoo_crus_app_stat_page extends $.$hyoo_crus_app_stat_page {
		
		@ $mol_mem
		stat() {
			const ref = $hyoo_crus_ref( this.$.$mol_fetch.text( this.$.$hyoo_crus_glob.yard().master_current() + 'ref' ) )
			return this.$.$hyoo_crus_glob.Node( ref, $hyoo_crus_app_home ).stat()
		}
		
		@ $mol_mem
		mem_alloc() {
			return this.stat()?.Mem_max()?.series() ?? []
		}
		
		@ $mol_mem
		fs_alloc() {
			return this.stat()?.Fs_used()?.series() ?? []
		}
		
		@ $mol_mem
		cpu_user() {
			return this.stat()?.Cpu_user()?.series() ?? []
		}
		
		@ $mol_mem
		cpu_system() {
			return this.stat()?.Cpu_system()?.series() ?? []
		}
		
		@ $mol_mem
		fs_read() {
			return this.stat()?.Fs_read()?.series() ?? []
		}
		
		@ $mol_mem
		fs_write() {
			return this.stat()?.Fs_write()?.series() ?? []
		}
		
	}
}
