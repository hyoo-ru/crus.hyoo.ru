namespace $ {
	
	if( typeof window === 'undefined' ) {
		
		const realm = new $hyoo_crus_realm
		
		const Query = $hyoo_harp_scheme({
			CRUS: $hyoo_harp_scheme({}),
			file: $hyoo_harp_scheme( {}, $mol_data_string ),
			// name: $mol_data_optional( $hyoo_harp_scheme( {}, $mol_data_string ) ),
		})
		
		self.addEventListener( 'fetch' , ( event: any )=> {
			
			const url = new URL( event.request.url )
			try {
				var query = Query.parse( url.search )
			} catch { return }
			
			const id = query.file['=']?.[0][0]
			if( !id ) return
			
			const ref = $hyoo_crus_ref( id )
			const file = realm.Node( ref, $hyoo_crus_file )
			
			return event.respondWith( $mol_wire_async( file ).blob().then( blob => {
				
				return new Response( blob, {
					status: file.filled() ? 200 : 404,
					statusText: file.filled() ? 'OK' : 'Not Filled',
					headers: {
						'Content-Type': file.type(),
						'X-Powered-By': '$hyoo_crus_file',
					},
				} )
				
			} ) )
			
		} )
		
	}
	
}
