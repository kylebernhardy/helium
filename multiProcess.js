const cluster = require('cluster');

if(cluster.isMaster){
    const NUM_PROCESS = 5;

    for(let x = 0; x < NUM_PROCESS; x++){
        cluster.fork({w_id: x});
    }

} else {
    const writer = require('./multiStoreWrite');
}