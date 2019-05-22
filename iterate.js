var he = require( 'node-helium' );

var OPEN_SETTINGS = he.HE_O_CREATE | he.HE_O_VOLUME_CREATE;
var myHe = he.open( 'he://./tmp/4g', 'name', OPEN_SETTINGS, null );

var counter = 0;
he.func.iterate( myHe, 50, 50, function( keySize, valueSize, key, val ) {
    // This will execute once for every key in the datastore.
    console.log( key.toString() + ' ' + val.toString() );
});

he.close( myHe );