const cluster = require('cluster');

if(cluster.isMaster){
    const NUM_PROCESS = 1;

    for(let x = 0; x < NUM_PROCESS; x++){
        cluster.fork({w_id: x, num_records: 1, iterations: 1000});
    }

} else {
    const writer = require('./multiStoreWrite');
}