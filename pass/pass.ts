namespace $ {
	
	/** Public key of Peer */
	export class $hyoo_crus_pass extends $hyoo_crus_unit {
		
		_lord!: $hyoo_crus_ref
		lord( next?: $hyoo_crus_ref ) {
			if( next === undefined && this._lord !== undefined ) return this._lord
			else return this._lord = this.id12( 2, next )
		}
		
		key(): string {
			return `pass:${ this.id6( 2 ) }`
		}
		
		auth( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		dump() {
			return {
				kind: this.kind(),
				lord: this.lord().description!,
			}
		}
		
		rank_min() {
			return $hyoo_crus_rank( $hyoo_crus_rank_tier.join | ( $hyoo_crus_rank_rate.just - this.work() ) )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.peer(),
				' 🔑 ',
				$mol_dev_format_span( {}, this.lord().description ),
			)
		}
		
	}
	

}
