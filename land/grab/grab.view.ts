namespace $.$$ {
	export class $hyoo_crus_land_grab extends $.$hyoo_crus_land_grab {
		
		value( rights?: string ) {
			
			const preset = ( {
				private: $hyoo_crus_rank_private,
				public: $hyoo_crus_rank_public,
				lobby: $hyoo_crus_rank_lobby,
				orgy: $hyoo_crus_rank_orgy,
			} as Record< string, $hyoo_crus_rank_preset > )[ rights as any ]
			
			if( preset ) this.grab( preset )
			
			return ''
		}
		
	}
}
