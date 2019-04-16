var express = require('express');
// npm install express --save
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
/* npm install --save body-parser cookie-parser express-session
      passport passport-local */

const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

// npm install cors --save
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

passport.use('local', new LocalStrategy.Strategy(function(
    username, password, done) {
        if(username === "user" && password === '12345') {
            return done(null, username);
        } else {
            return done("Wrong username/pw", null);
        }
    }));

passport.serializeUser(function(username, done) {
    return done(null, username);
});

passport.deserializeUser(function(username, done) {
    return done(null, username);
});

app.use(expressSession({secret: '123456ezegyelrefijheigeihgieajhgijheaighiea'}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))

app.use('/', require('./routes'));

app.listen(PORT, function() {
    console.log('app is listening');
});

// node index.js