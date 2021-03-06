const he = require( 'node-helium' );

const OPEN_SETTINGS = he.HE_O_VOLUME_CREATE | he.HE_O_CREATE  | he.HE_O_VOLUME_TRUNCATE;
//const OPEN_SETTINGS = he.HE_O_VOLUME_CREATE | he.HE_O_CREATE;

let he_id = he.open( 'he://localhost:41000//tmp/4g', 'id', OPEN_SETTINGS, null );
let he_name = he.open( 'he://localhost:41000//tmp/4g', 'name', OPEN_SETTINGS, null );
let he_timestamp =  he.open( 'he://localhost:41000//tmp/4g', 'timestamp', OPEN_SETTINGS, null );

printStats(he_name);
//printStats(he_id);
//printStats(he_timestamp);

function printStats(he_attr){
    let stats = he.stats( he_attr );
    console.log( stats );

    he.close(he_attr);
}

//he.close( he_name );
