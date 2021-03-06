
/**
 * This method is O(n), the only requirement is that the
 * set of vertices should be prealably sorted.
 *
 *
 * From Wikipedia :
 *
 * Monotone chain aka Andrew's algorithm — O(n log n)
 * Published in 1979 by A. M. Andrew. The algorithm can be seen as a variant of
 * Graham scan which sorts the points lexicographically by their coordinates.
 * When the input is already sorted, the algorithm takes O(n) time.
 *
 * -> https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
 *
 * hypothesis : set is lexicographically ordered
 * ( in 2D : sorted according to x then y or y then x )
 */

const gscanmono = function ( crs , points , i , j , lo ) {

	const hi = [] ;

	hi.push( points[i] ) ;
	hi.push( points[i + 1] ) ;
	lo.push( points[i] ) ;
	lo.push( points[i + 1] ) ;

	let p = 0 ;
	let q = 0 ;

	for ( let k = i + 2 ; k < j ; ++k ) {

		const u = points[k] ;

		while ( p >= 0 && crs( hi[p] , hi[p + 1] , u ) >= 0 ) {
			hi.pop() ;
			--p ;
		}

		hi.push( u ) ;
		++p ;

		while ( q >= 0 && crs( lo[q] , lo[q + 1] , u ) <= 0 ) {
			lo.pop() ;
			--q ;
		}

		lo.push( u ) ;
		++q ;

	}

	// enumerate hull vertices
	// counter clock wise, in fact ccw if set is monotone *increasing*,
	// cw otherwise
	//
	//                 * - < - * - < - *
	//                /                 \
	// hi[0] = lo[0] *                   * hi[p + 1] = lo[q + 1]
	//                \                 /
	//                 * - > - * - > - *
	//
	// Note that the first and last elements of hi are droped since
	// they are already in lo

	for ( let k = p ; k > 0 ; --k ) lo.push( hi[k] ) ;

} ;


exports.gscanmono = gscanmono ;
