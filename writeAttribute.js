const he = require( 'node-helium' );

let args = process.argv[2];

let he_attr = he.open( 'he://./tmp/4g', 'id', OPEN_SETTINGS, null );

function write(key, value, he_attr){
    let myKey = new Buffer.from( key, 'utf-8' );
    let myVal = new Buffer.from( value, 'utf-8' );
    let testItem = he.make_item( myKey, myVal, myKey.byteLength, myVal.byteLength );
    he.insert( he_attr, testItem );
}