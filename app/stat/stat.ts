namespace $ {
	
	export class $hyoo_crus_app_stat extends $hyoo_crus_dict.with({
		
		/** User time in secs */
		Cpu_user: $hyoo_crus_stat_ranges,
		/** System time in secs */
		Cpu_system: $hyoo_crus_stat_ranges,
		
		/** Memory in MB */
		Mem_used: $hyoo_crus_stat_ranges,
		/** FS used */
		Fs_used: $hyoo_crus_stat_ranges,
		
		/** FS read count */
		Fs_read: $hyoo_crus_stat_ranges,
		/** FS write count */
		Fs_write: $hyoo_crus_stat_ranges,
		
	}) {
		
		@ $mol_mem
		tick() {
			
			this.$.$mol_state_time.now( 1000 )
			
			const res = $mol_wire_sync( process ).resourceUsage()
			const mem_total = $mol_wire_sync( process ).constrainedMemory() ?? $mol_wire_sync( $node.os ).totalmem()
			const fs = $mol_wire_sync( $node.fs ).statfsSync( '.' )
			
			this.Cpu_user( null )!.tick_integral( res.userCPUTime / 1e6 ) // s
			this.Cpu_system( null )!.tick_integral( res.systemCPUTime / 1e6 ) // s
			
			this.Mem_used( null )!.tick_instant( ( res.maxRSS - res.sharedMemorySize ) * 1024 / mem_total * 100 ) // %
			this.Fs_used( null )!.tick_instant( ( Number( fs.blocks ) - Number( fs.bfree ) ) / Number( fs.blocks ) * 100 ) // %
			
			this.Fs_read( null )!.tick_integral( res.fsRead ) // pct
			this.Fs_write( null )!.tick_integral( res.fsWrite ) // pct
			
		}
		
	}
	
}
