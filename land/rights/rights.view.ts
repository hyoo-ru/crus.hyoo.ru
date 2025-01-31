namespace $.$$ {
	export class $hyoo_crus_land_rights extends $.$hyoo_crus_land_rights {
		
		@ $mol_mem
		override gifts() {
			const self = this.land().ref()
			return [ ... this.land().gift.keys() ]
				.filter( ref => ref.description && ( self !== ref ) )
				.map( ref => this.Gift( ref.description! ) )
		}
		
		override peer_id( id: string ) {
			return id
		}
		
		override peer_name( id: string ) {
			return this.$.$hyoo_crus_glob.Node( $hyoo_crus_ref( id ), $hyoo_crus_entity ).title() || id
		}
		
		@ $mol_mem_key
		override gift_rank( id: string, next?: keyof typeof $hyoo_crus_rank_tier ) {
			return $hyoo_crus_rank_tier[ this.land().lord_rank( $hyoo_crus_ref( id ), next && $hyoo_crus_rank_make( next, 'just' ) ) ^ $hyoo_crus_rank_rate.just ]??'uknown'
		}
		
		add_commit() {
			const auth = $hyoo_crus_auth.from( this.add_key() )
			this.land().give( auth, $hyoo_crus_rank_read )
			this.add_key( '' )
		}
		
	}
}
