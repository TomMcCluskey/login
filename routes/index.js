var express = require('express');
var router = express.Router();

var passport = require('passport'),
	LocalStrategy = require('passport-local');

//var orch = require('orchestrate');
//var config = require('./config');
//var db = orch(config.dbkey);

/*
function localAuth(username,password,then) {
	if (username.length === password.length) {
		then({username: username, status: 'ok'});
	} else {
		then(null)
	}
}
*/

passport.use('local-signin', new LocalStrategy(
	//{passReqToCallback : true},
	//function(req, username, password, done) {
	function(username, password, done) {
		console.log("Local strategy:",username,password);
		// db.get('passport-users',username).then(function(reply){
		// 	var user = reply.body;
		// 	pwd.hash(password,user.salt,function(hash){
		// 		if (hash===user.hash) {
					
		// 		}
		// 	})
		// })

		var user = (username===password) && {name: username, time: Date().toLocaleString()}
		done(null,user);
		// localAuth(username,password,function(user) {
		// 	console.log('outcome: ',user);
		// 	done(null,user);
		// })
	})
)
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user)
 		res.render('index', { title: 'Express', name: req.user.name, time:req.user.time });
 	else
 		res.redirect('/login');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/api/login', passport.authenticate('local-signin', { 
	successRedirect: '/',
	failureRedirect: '/login'
  })
);
//  res.send('some json!');


module.exports = router;
