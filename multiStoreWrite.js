const he = require( 'node-helium' );
const randomwords = require('random-words');
const uuidv4 = require('uuid/v4');

const OPEN_SETTINGS = he.HE_O_CREATE | he.HE_O_VOLUME_CREATE ;

let he_id = he.open( 'he://localhost:41000//tmp/4g', 'id', OPEN_SETTINGS, null );
let he_name = he.open( 'he://localhost:41000//tmp/4g', 'name', OPEN_SETTINGS, null );
let he_timestamp =  he.open( 'he://localhost:41000//tmp/4g', 'timestamp', OPEN_SETTINGS, null );
/*let he_id = he.open( 'he://.//tmp/4g', 'id', OPEN_SETTINGS, null );
let he_name = he.open( 'he://.//tmp/4g', 'name', OPEN_SETTINGS, null );
let he_timestamp =  he.open( 'he://.//tmp/4g', 'timestamp', OPEN_SETTINGS, null );*/


//number of iterations to execute writes
const NUM_RECORDS = process.env['num_records'] ? process.env['num_records'] : 1000;

const ITERATE = process.env['iterations'] ? process.env['iterations'] : 1;

const w_id = process.env['w_id'] ? process.env['w_id'] : 0;


let ids = [];
let words = [];
let timestamps = [];

for(let k = 0; k < ITERATE; k++) {
    ids = [];
    words = [];
    timestamps = [];
    seedData();
    writeData();
}

function writeData() {
    console.time(`test${w_id}`);
//write to each data store
    for (let x = 0; x < NUM_RECORDS; x++) {
        let key = ids[x];
        write(key, key, he_id);
        write(key, words[x], he_name);
        write(key, timestamps[x], he_timestamp);
    }
    console.timeEnd(`test${w_id}`);
}



printStats(he_name);
printStats(he_id);
printStats(he_timestamp);

/**
 * creates an item and writes to a data store
 * @param key
 * @param value
 * @param he_attr
 */
function write(key, value, he_attr){
    let myKey = new Buffer.from( key, 'utf-8' );
    let myVal = new Buffer.from( value, 'utf-8' );
    let testItem = he.make_item( myKey, myVal, myKey.byteLength, myVal.byteLength );
    he.insert( he_attr, testItem );
}

/**
 * prints the stats for a data store
 * @param he_attr
 */
function printStats(he_attr){
    let stats = he.stats( he_attr );
    //console.log( stats );
    he.close(he_attr);
}

/**
 * creates dummy data
 */
function seedData(){
    for(let x = 0; x < NUM_RECORDS; x++) {
        let uu = w_id + '_' + uuidv4();
        ids.push(uu);
        words.push(randomwords({ min: 3, max: 10 }).join(' '));
        timestamps.push(Date.now().toString());
    }
}
