namespace $ {
	
	/** Public key of Peer */
	export class $hyoo_crus_pass extends $hyoo_crus_unit {
		
		_peer!: $hyoo_crus_link
		peer() {
			if( this._peer !== undefined ) return this._peer
			else return this._peer = this.lord().peer()
		}
		
		_lord!: $hyoo_crus_link
		lord() {
			if( this._lord !== undefined ) return this._lord
			else return this._lord = $hyoo_crus_link.hash_bin( this.sens() ).lord()
		}
		
		key(): string {
			return `pass:${ this.peer() }`
		}
		
		auth( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		dump() {
			return {
				kind: this.kind(),
				lord: this.lord(),
			}
		}
		
		rank_min() {
			return $hyoo_crus_rank( $hyoo_crus_rank_tier.join | ( $hyoo_crus_rank_rate.just - this.work() ) )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				$mol_dev_format_auto( this.peer() ),
				' 🔑 ',
				$mol_dev_format_auto( this.lord() ),
			)
		}
		
	}
	

}
