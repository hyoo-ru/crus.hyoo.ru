namespace $ {

	export class $hyoo_crus_stat_ranges extends $hyoo_crus_dict.with({
		Seconds: $hyoo_crus_stat_series,
		Minutes: $hyoo_crus_stat_series,
		Hours: $hyoo_crus_stat_series,
		Days: $hyoo_crus_stat_series,
		Years: $hyoo_crus_stat_series,
	}) {
		
		// @ $mol_action
		tick( val: number ) {
			
			let now = new $mol_time_moment
			
			const second = BigInt( Math.floor( now.second! ) )
			const minute = BigInt( now.minute! )
			const hour = BigInt( now.hour! )
			const from_ny = new $mol_time_interval({ start: { year: now.year, month: 0, day: 0 }, end: now })
			const day = BigInt( Math.floor( from_ny.duration.count( 'P1D' ) ) )
			const year = BigInt( now.year! )
			
			this.Seconds( null )!.tick( second, val )
			this.Minutes( null )!.tick( minute, val )
			this.Hours( null )!.tick( hour, val )
			this.Days( null )!.tick( day, val )
			this.Years( null )!.tick( year, val )
			
		}
		
		@ $mol_mem
		series() {
			
			function pick( Series: $hyoo_crus_stat_series, length: number, range: number ) {
				
				let series = Array.from( { length }, ( _, i )=> Series.key( BigInt( i ) )?.val() ?? 0 )
				
				let start = 0
				let max = 0
				
				for( let i = 0; i < series.length; ++i ) {
					if( series[i] < max ) continue
					max = series[i]
					start = i + 1
				}
				
				if( start ) series = [ ... series.slice( start ), ... series.slice( 0, start - 1 ) ]
				
				let last = series[0]
				
				series = series.slice(1).map( val => {
					
					try {
					
						if( last === 0 || val < last ) return 0
						return ( val - last ) / range
						
					} finally {
						last = Math.max( val, last )
					}
					
				} )
				
				return series
			}
			
			let days = pick( this.Days()!, 365, 60 * 60 * 24 )
			let hours = pick( this.Hours()!, 24, 60 * 60 )
			let minutes = pick( this.Minutes()!, 60, 60 )
			let seconds = pick( this.Seconds()!, 60, 1 )
			
			return [ ... days, ... hours, ... minutes, ... seconds ].reverse()
		}

	}
	
}
