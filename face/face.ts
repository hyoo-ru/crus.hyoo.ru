namespace $ {
	
	export type $hyoo_cras_face_data = Iterable< readonly [ number /*peer*/, number /* timestamp */ ] >
	
	// export class $hyoo_cras_face_lord {
		
	// 	constructor(
	// 		readonly rang: $hyoo_cras_rang,
	// 		readonly time: number,
	// 	) {}
		
	// 	/* Merge peer faces using max values. */
	// 	static max( left: $hyoo_cras_face_lord, right: $hyoo_cras_face_lord ) {
	// 		return new $hyoo_cras_face_lord(
	// 			Math.max( left.rang, right.rang ),
	// 			Math.max( left.time, right.time ),
	// 		)
	// 	}
		
	// 	[ $mol_dev_format_head ]() {
	// 		return $mol_dev_format_span( {} ,
	// 			$mol_dev_format_native( this ) ,
	// 			$mol_dev_format_accent( ' ' + $hyoo_cras_rang[ this.rang ] + ' ' ) ,
	// 			... this.time ? [ new Date( this.time ) ] : [] ,
	// 		)
	// 	}
		
	// }
	
	export class $hyoo_cras_face extends Map< number /*peer*/, number /* timestamp */ > {
		
		/** Maximum time for all peers. */
		last = 0
		
		constructor(
			entries?: $hyoo_cras_face_data
		) {
			
			super( entries )
			if( !entries ) return
			
			for( const [ peer, time ] of entries ) {
				this.see_time( time )
			}
			
		}
		
		/** Synchronize this clock with another. */
		sync( right: $hyoo_cras_face_data ) {
			for( const [ peer, time ] of right ) {
				this.see_peer( peer, time )
			}
		}
		
		/** Increase `last` to latest. */
		see_time( time: number ) {
			if( time < this.last ) return
			this.last = time
		}
		
		/** Merge new `face` for `peer` and increase `last`. */
		see_peer(
			peer: number,
			time: number,
		) {
			
			const exists = this.get( peer )
			if( exists ) time = Math.max( exists, time )
			
			this.set( peer, time )
			this.see_time( time )
			
		}
		
		// see_bin( bin: $hyoo_cras_clock_bin ) {
			
		// 	for( let cursor = 16; cursor < bin.byteLength; cursor += 12 ) {
				
		// 		this.see_peer(
		// 			bin.uint48( cursor ),
		// 			bin.uint48( cursor + 6 ),
		// 		)
				
		// 	}

		// }
		
		// /** Checks if time from future. */
		// fresh(
		// 	peer: number,
		// 	time: number,
		// ) {
		// 	return time > ( this.get( peer )?.time ?? 0 )
		// }
		
		// /** Checks if this clock from future of another. */
		// ahead( clock: $hyoo_cras_face ) {
			
		// 	for( const [ peer, time ] of this ) {
		// 		if( clock.fresh( peer, time ) ) return true
		// 	}
			
		// 	return false
		// }
		
		/** Gererates new time for peer that greater then other seen. */
		@ $mol_action
		tick( peer: number ) {
			
			let time = Date.now()
			if( time <= this.last ) time = this.last + 1
			
			this.see_peer( peer, time )
			return time
			
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				$mol_dev_format_shade( ' ', new Date( this.last ) ) ,
			)
		}
		
	}
	
	// export class $hyoo_cras_clock_bin extends $mol_buffer {
		
	// 	static from(
	// 		land_id: $mol_int62_string,
	// 		clock: $hyoo_crowd_clock,
	// 		rangs: Map< string /*peer*/, $hyoo_cras_unit_gift >,
	// 		count: number,
	// 	) {
			
	// 		const size = offset.clocks + clocks[0].size * 16
	// 		const mem = new Uint8Array( size )
	// 		const bin = new $hyoo_crowd_clock_bin( mem.buffer )
			
	// 		const land = $mol_int62_from_string( land_id )!
	// 		bin.setInt32( offset.land_lo, land.lo ^ ( 1 << 31 ), true )
	// 		bin.setInt32( offset.land_hi, land.hi, true )
			
	// 		bin.setInt32( offset.count, count, true )
			
	// 		let cursor = offset.clocks
	// 		for( const [ peer_id, time ] of clocks[0] ) {
				
	// 			const peer = $mol_int62_from_string( peer_id )!
				
	// 			bin.setInt32( cursor + 0, peer.lo, true )
	// 			bin.setInt32( cursor + 4, peer.hi, true )
				
	// 			bin.setInt32( cursor + 8, time, true )
	// 			bin.setInt32( cursor + 12, clocks[1].get( peer_id ) ?? $hyoo_crowd_clock.begin, true )
				
	// 			cursor += 16
	// 		}
			
	// 		return bin
	// 	}
		
	// 	land() {
	// 		return $mol_int62_to_string({
	// 			lo: this.getInt32( offset.land_lo, true ) << 1 >> 1,
	// 			hi: this.getInt32( offset.land_hi, true ) << 1 >> 1,
	// 		})
	// 	}
		
	// 	count() {
	// 		return this.getInt32( offset.count, true )
	// 	}
		
	// }
	
}
