namespace $ {
	
	/** Land local Node id namespace: data, meta */
	export enum $hyoo_crus_area {
		/** Common user info */
		data = 0,
		/** Land meta info */
		meta = 1,
	}
	
	export function $hyoo_crus_area_of( numb: string ) {
		const num = $mol_base64_ae_decode( numb || 'AAAAAAAA' )[0]
		return $hyoo_crus_area[ num % 2 ] as keyof typeof $hyoo_crus_area
	}
	
	export function $hyoo_crus_area_to( numb: string, area: keyof typeof $hyoo_crus_area ) {
		const buf = $mol_base64_ae_decode( numb || 'AAAAAAAA' )
		buf[0] -= buf[0] % 2 - $hyoo_crus_area[ area ]
		numb = $mol_base64_ae_encode( buf )
		return numb
	}
	
}
