namespace $ {
	
	export class $hyoo_crus_app_stat extends $hyoo_crus_dict.with({
		
		/** User time in secs */
		Cpu_user: $hyoo_crus_stat_ranges,
		/** System time in secs */
		Cpu_system: $hyoo_crus_stat_ranges,
		
		/** FS used */
		Fs_used: $hyoo_crus_stat_ranges,
		/** Memory in MB */
		Mem_max: $hyoo_crus_stat_ranges,
		
		/** FS read count */
		Fs_read: $hyoo_crus_stat_ranges,
		/** FS write count */
		Fs_write: $hyoo_crus_stat_ranges,
		
	}) {
		
		@ $mol_mem
		tick() {
			
			this.$.$mol_state_time.now( 1000 )
			const res = $mol_wire_sync( process ).resourceUsage()
			const fs = $mol_wire_sync( $node.fs ).statfsSync( '.' )
			
			this.Cpu_user( null )!.tick( res.userCPUTime / 1e6 ) // s
			this.Cpu_system( null )!.tick( res.systemCPUTime / 1e6 ) // s
			
			this.Mem_max( null )!.tick( res.maxRSS / 1024 ) // MB
			
			const fs_mult = Number( fs.bsize ) / 1024 / 1024
			this.Fs_used( null )!.tick( ( Number( fs.blocks ) - Number( fs.bfree ) ) * fs_mult ) // MB
			
			this.Fs_read( null )!.tick( res.fsRead ) // pct
			this.Fs_write( null )!.tick( res.fsWrite ) // pct
			
		}
		
	}
	
}
