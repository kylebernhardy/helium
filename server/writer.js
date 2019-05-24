const he = require( 'node-helium' );

const OPEN_SETTINGS = he.HE_O_CREATE | he.HE_O_VOLUME_CREATE ;

let he_id = he.open( 'he://localhost:41000//tmp/4g', 'id', OPEN_SETTINGS, null );
let he_name = he.open( 'he://localhost:41000//tmp/4g', 'name', OPEN_SETTINGS, null );
let he_timestamp =  he.open( 'he://localhost:41000//tmp/4g', 'timestamp', OPEN_SETTINGS, null );

function processData(data){
    let key = data.id.toString();
    write(key, key, he_id);
    write(key, data.name.toString(), he_name);
    write(key, data.timestamp.toString(), he_timestamp);


}

function write(key, value, he_attr){
    let myKey = new Buffer.from( key, 'utf-8' );
    let myVal = new Buffer.from( value, 'utf-8' );
    let testItem = he.make_item( myKey, myVal, myKey.byteLength, myVal.byteLength );
    let ret = he.insert( he_attr, testItem );

    if(ret !== 0){
        throw new Error('bad write! ' + he.strerror(ret));
    }
}

module.exports = processData;