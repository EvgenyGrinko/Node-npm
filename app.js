const express = require('express');
const app = express();
app.use("/public", express.static(__dirname + "/public"));
app.get('/json', (req, res) => process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ key: 'DATA' })
    : res.json({ key: 'data' }));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/', (req, res) => res.send('Hello'));
app.listen(3000);
