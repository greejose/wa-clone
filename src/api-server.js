const express = require('express');
const {setupRedis, getClient} = require('./redis-client');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!-Booya');
});

app.get('/redis-test', (req, res) => {
    getClient().incr('inc-test', (err, result) => {
        if (err) {
            res.send('Error incrementing redis test');
        }
        else {
            res.send(`Redis increment test result: ${result}`);
        }
    });
});

setupRedis();

app.listen(port, () => {
    console.log('Express app listening on port 3000');
});