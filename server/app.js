const cluster = require('cluster');
const NUMBER_PROCS = 1;
if(cluster.isMaster){
    for(let x = 0;x < NUMBER_PROCS; x++){
        cluster.fork();
    }
} else {

    const express = require('express');
    const bodyParser = require('body-parser');
    const write = require('./writer');
    const app = express();
    app.use(bodyParser());

    const port = 3000;

    app.post('/', (req, res) => {
        try {
            console.time('test');
            write(req.body);
            console.timeEnd('test');
            res.status(200).send('ok');
        } catch (e) {
            console.timeEnd('test');
            res.status(500).send(e.message);
        }
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}