var Benchmark = require('benchmark')
	, verb = require('../build/verb.js');

// callbacks for tests
function getComplexSurface(){ 
	verb.init();

	var degree = 3
		, knots = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
		, pts = [ 	[ [0, 0, -10], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] , 	[40, 0, 0], [50, 0, 0] ],
								[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] , [40, -10, 0], [50, -10, 0]	],
								[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] , [40, -20, -2], [50, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, -23], 	[30, -30, 0] , [40, -30, 0], [50, -30, 0]     ],  
								[ [0, -40, 0], 	[10, -40, 0], 	[20, -40, 0], 	[30, -40, 4] , [40, -40, -20], [50, -40, 0]     ],  
								[ [0, -50, 12], [10, -50, 0], 	[20, -50, 0], 	[30, -50, 0] , [50, -50, 0], [50, -50, -15]     ],     ]
		, wts = [ 	[ 1, 1, 1, 1, 1, 1],
								[ 1, 1, 1, 1, 1, 1],
								[ 1, 1, 1, 1, 1, 1],
								[ 1, 1, 1, 1, 1, 1],
								[ 1, 1, 1, 1, 1, 1],
								[ 1, 1, 1, 1, 1, 1] ];

	srf = new verb.geom.NurbsSurface( degree, knots, degree, knots, pts, wts );

	var srfObj = {
		degree_u : srf.get('degreeU'),
		degree_v : srf.get('degreeV'),
		knots_u : srf.get('knotsU'),
		knots_v : srf.get('knotsV'),
		homo_control_points : srf.homogenize()
	};

	return srfObj;
}

var srf = getComplexSurface();

module.exports = function() {
	var fn = new verb.eval.nurbs.AdaptiveRefinementNode( srf );
	fn.divide({ tol: 2 });
	fn.triangulate();

	console.log('hi')
}

