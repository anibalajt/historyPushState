var express = require("express"),
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");
// mongoose = require('mongoose');

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

router.get('/api/', function(req, res) {
	res.send("Hello World!");
});
router.get('/api/:id', function(req, res){
	res.send("anibalajt hola ");
});
// router.get('/find/friends',function(req, res){
// 	res.send("find-friends");
// });
app.use(router);


app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});
// mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
// 	if(err) {
// 		console.log('ERROR: connecting to Database. ' + err);
// 	}
// 	app.listen(3000, function() {
// 		console.log("Node server running on http://localhost:3000");
// 	});
// });
