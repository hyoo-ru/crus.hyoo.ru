namespace $ {
	
	export enum $hyoo_crus_zone {
		root = 0,
		core = 1,
	}
	
	export function $hyoo_crus_zone_of( numb: string ) {
		const num = $mol_base64_ae_decode( numb || 'AAAAAAAA' )[0]
		return $hyoo_crus_zone[ num % 2 ] as keyof typeof $hyoo_crus_zone
	}
	
	export function $hyoo_crus_zone_to( numb: string, zone: keyof typeof $hyoo_crus_zone ) {
		const buf = $mol_base64_ae_decode( numb || 'AAAAAAAA' )
		buf[0] -= buf[0] % 2 - $hyoo_crus_zone[ zone ]
		numb = $mol_base64_ae_encode( buf )
		return numb
	}
	
}
