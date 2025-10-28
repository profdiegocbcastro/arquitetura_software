const express = require('express');
const app = express();

app.get('/healthcheck', (req, res) => {
    res.json({status: 'ok'});
});

const port = 3002;

app.listen(port, function () {
    console.log(`http://localhost:${port}/healthcheck`);
});