namespace $ {
	
	export enum $hyoo_crus_part {
		
		/** Land header for the following parts. */
		land = 0b0000_0011,
		/** Land face. */
		face = 0b0000_1011,
		
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		/** Rights/Keys sharing. Last writes wins. */
		gift = 0b1111_0111,
		
		/** Changeable data. Last writes wins. */
		gist = 0b0000_1000,
		
		/** Blob response. */
		rock = 0b0000_0101,
		
		/** B+Tree root bucket. */
		root = 0b0000_0001,
		/** B+Tree branch bucket. */
		buck = 0b0000_1001,
		
	}
	
}
