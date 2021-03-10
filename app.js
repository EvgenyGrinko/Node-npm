const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`); //Expected smth like "GET /json - ::ffff:127.0.0.1"
    next();
}
app.use(logger);//when you don't pass the first argument as a 'path', the middleware will be applyed for all requests
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

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
//Route parameters
app.get('/:word/echo', (req, res) => res.json({ echo: req.params.word }));
//Query parameters
//Request example: http://localhost:3000/name?first=Jo&last=Bro
app.get('/name',
    (req, res) => res.json({ name: `${req.query.first} ${req.query.last}` })
);
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/', (req, res) => res.send('Hello'));//Never reached

//On submit form we're redirected to the route http://localhost:3000/name?first=first+you+typed&last=whatYouTiped
//body-parser middleware parses from the urlencoded route string query params and add them to the "req.query" object
app.post('/name', (req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }))
app.listen(port, () => console.log(`Server is listening on port ${port}`));
