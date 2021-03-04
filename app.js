const express = require('express');
const app = express();

const port = 3000;

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`); //Expected smth like "GET /json - ::ffff:127.0.0.1"
    next();
}
app.use(logger);//when you don't pass the first argument as a 'path', the middleware will be applyed for all requests
app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ key: 'DATA' })
    : res.json({ key: 'data' }));
//Chain middleware
app.get('/now',
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => res.json({ time: req.time })
);

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/', (req, res) => res.send('Hello'));//Never reached

app.listen(port, () => console.log(`Server is listening on port ${port}`));