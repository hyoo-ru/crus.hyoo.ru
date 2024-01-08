namespace $ {
	
	export type $hyoo_crus_face_data = Iterable< readonly [ peer: string, face: $hyoo_crus_face ] >
	
	export type $hyoo_crus_face = {
		stamp: number // unix timestamp
		milli: number // milliseconds
		count: number // unit count
	}
	
	export class $hyoo_crus_face_map extends Map< string, $hyoo_crus_face > {
		
		/** Maximum time for all peers. */
		last = 0
		
		/** Total unit count. */
		count = 0
		
		constructor(
			entries?: $hyoo_crus_face_data
		) {
			super()
			if( entries ) this.sync( entries )
		}
		
		/** Synchronize this clock with another. */
		sync( right: $hyoo_crus_face_data ) {
			for( const [ peer, face ] of right ) {
				this.time_max( peer, face.stamp * 1000 + face.milli )
				this.count_shift( peer, face.count )
			}
		}
		
		/** Change unit cout for peer. */
		count_shift(
			peer: string,
			count: number,
		) {
			
			this.count += count
			
			let face = this.get( peer )
			if( !face ) this.set( peer, face = { stamp: 0, milli: 0, count: 0 } )
			
			face.count += count
			
			return face.count
		}
		
		/** Update last time for peer. */
		time_max(
			peer: string,
			time: number,
		) {
			
			if( this.last < time ) this.last = time
			
			let face = this.get( peer )
			if( !face ) this.set( peer, face = { stamp: 0, milli: 0, count: 0 } )
			
			time = Math.max( face.stamp * 1000 + face.milli, time )
			
			face.stamp = Math.floor( time / 1000 )
			face.milli = time % 1000
			
			return time
		}
		
		time( peer: string ) {
			
			const face = this.get( peer )
			if( !face ) return 0
			
			return face.stamp * 1000 + face.milli
			
		}
		
		/** Gererates new time for peer that greater then other seen. */
		@ $mol_action
		tick() {
			return this.last = Math.max( this.last + 1, Date.now() )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				$mol_dev_format_shade( ' ', new Date( this.last ) ) ,
			)
		}
		
	}
	
}
