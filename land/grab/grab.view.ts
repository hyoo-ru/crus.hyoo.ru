namespace $.$$ {
	export class $hyoo_crus_land_grab extends $.$hyoo_crus_land_grab {
		
		value( rights?: string ) {
			
			const preset = ( {
				deny: [],
				read: [[ null, $hyoo_crus_rank_read ]],
				post: [[ null, $hyoo_crus_rank_post( 'slow' ) ]],
				pull: [[ null, $hyoo_crus_rank_pull( 'slow' ) ]],
			} as Record< string, $hyoo_crus_rank_preset > )[ rights as any ]
			
			if( preset ) this.grab( preset )
			
			return ''
		}
		
	}
}
