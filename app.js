var express = require("express"),
app = express(),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bodyParser  = require("body-parser"),
methodOverride = require("method-override");
mongoose = require('mongoose');
user = require('./models/user.js')

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // next();
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
app.use('/:id',express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app'));


router.get('/api/:id', function(req, res){
    switch (req.params.id) {
        case 'anibalajt':
        var newUser = new user({email:"nuevouser3@gmail.com",
        nickname:"nuevo user 3",
        id:"asdas13wedqw232243t5yhgf",
        password: "123456"});

        user.findOne({
            'nickname': "nuevo user4"
        }, function (err, user) {
            if (user) {
                res.status(400).send({
                    'error': 'email_in_use'
                });
                return false;
            }else{
                newUser.save(function (err, newUser) {
                    if (err){return console.error(err);}
                    res.status(200).send({page:"profile",data:"profile"})
                });
            }
        })
        break;
        default:
        res.status(200).send(res.status(200).send({page:"profile",data:"mensaje"}));
        break
    }

});
app.use(router);





mongoose.connect('mongodb://localhost/inmortus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
});

// app.listen(3000, function() {
//     console.log("Node server running on http://localhost:3000");
// });
// mongoose.connect('mongodb://localhost/inmortus', function(err, res) {
//     if(err) {
//         console.log('ERROR: connecting to Database. ' + err);
//     }
//     app.listen(3000, function() {
//         console.log("Node server running on http://localhost:3000");
//     });
// });
