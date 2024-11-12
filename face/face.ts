namespace $ {
	
	export type $hyoo_crus_face_data = Iterable< readonly [ peer: string, time: number ] >
	
	/** Statistics about Units in Land. it's total Units count & dictionary which maps Peer to Time */
	export class $hyoo_crus_face_map extends Map< string, number > {
		
		/** Maximum time for all peers. */
		last_time = 0
		
		/** Total units count in Land. */
		total = 0
		
		constructor(
			entries?: $hyoo_crus_face_data
		) {
			super()
			if( entries ) this.sync( entries )
		}
		
		/** Synchronize this clock with another. */
		sync( right: $hyoo_crus_face_data ) {
			if( right instanceof $hyoo_crus_face_map ) this.total = right.total
			for( const [ peer, time ] of right ) this.time_max( peer, time )
		}
		
		/** Update last time for peer. */
		time_max(
			peer: string,
			time: number,
		) {
			
			if( this.last_time < time ) this.last_time = time
			
			let prev = this.get( peer ) ?? 0
			if( prev < time ) this.set( peer, time )
			
		}
		
		/** Generates new time for peer that greater then other seen. */
		@ $mol_action
		tick() {
			++ this.last_time
			if( !this.atomics ) this.last_time = Math.max( this.last_time, Math.floor( Date.now() / 1000 ) * 65536 )
			return this.last_time
		}

		/** Deep of atomic transactions. */
		atomics = 0

		/** Run atomic transaction. */
		atomic( task: ()=> void ) {
			this.tick()
			++ this.atomics
			try {
				task()
			} finally {
				-- this.atomics
			}
		}
		
		/** Last change moment */
		last_moment() {
			return $hyoo_crus_time_moment( this.last_time )
		}
		
		[ $mol_dev_format_head ]() {
			
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				$mol_dev_format_shade( ' ', $hyoo_crus_time_dump( this.last_time ) ) ,
				$mol_dev_format_shade( ' #', this.total ) ,
			)
			
		}
		
	}
	
}
