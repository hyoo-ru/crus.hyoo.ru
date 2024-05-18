namespace $ {
	
	export enum $hyoo_crus_part {
		
		/** Land header for the following parts. */
		land = 0b1101_1011,
		
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		/** Rights/Keys sharing. Last writes wins. */
		gift = 0b1111_0111,
		/** Changeable data. Last writes wins. */
		gist = 0b0000_0000,
		
		/** Blob request. */
		hash = 0b1111_1101,
		/** Blob response. */
		rock = 0b1111_0101,
		
		/** B+Tree root bucket. */
		root = 0b0000_0001,
		
		/** B+Tree branch bucket. */
		buck = 0b0000_1001,
		
	}
	
}
