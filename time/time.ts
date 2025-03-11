namespace $ {
	
	/** Moment from time. */
	export function $hyoo_crus_time_moment( time: number ) {
		const stamp = time * 1000
		return new $mol_time_moment( stamp )
	}
	
	/** User readable time+tick view. */
	export function $hyoo_crus_time_dump( time: number ) {
		return $hyoo_crus_time_moment( time ).toString( 'YYYY-MM-DD hh:mm:ss' )
	}

	/** Current time with 0 tick. */
	export function $hyoo_crus_time_now() {
		return now || Math.floor( Date.now() / 1000 )
	}
	
	let now = 0

	/** Run atomic transaction by temp freezing time. */
	export function $hyoo_crus_time_freeze( task: ()=> void ) {

		if( now ) return task()
		
		now = $hyoo_crus_time_now()
		try {
			return task()
		} finally {
			now = 0
		}

	}
	
}
