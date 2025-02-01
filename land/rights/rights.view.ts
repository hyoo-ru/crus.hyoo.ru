namespace $.$$ {
	export class $hyoo_crus_land_rights extends $.$hyoo_crus_land_rights {
		
		@ $mol_mem
		override gifts() {
			const self = this.land().link()
			return [ ... this.land().gift.keys() ]
				.filter( link => self.str !== link )
				.map( link => this.Gift( link ) )
		}
		
		override peer_id( id: string ) {
			return id
		}
		
		override peer_name( id: string ) {
			return this.$.$hyoo_crus_glob.Node( new $hyoo_crus_link( id ), $hyoo_crus_entity ).title() || id
		}
		
		@ $mol_mem_key
		override gift_rank( id: string, next?: keyof typeof $hyoo_crus_rank_tier ) {
			return $hyoo_crus_rank_tier[ this.land().lord_rank( new $hyoo_crus_link( id ), next && $hyoo_crus_rank_make( next, 'just' ) ) ]
		}
		
		add_commit() {
			const auth = $hyoo_crus_auth.from( this.add_key() )
			this.land().give( auth, $hyoo_crus_rank_read )
			this.add_key( '' )
		}
		
	}
}
