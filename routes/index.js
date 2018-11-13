var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true });
var reviewSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String,
    Image: String
});
var Review = mongoose.model('Review', reviewSchema); //Makes an object from that schema as a model
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log("POST comment route"); 
    console.log(req.body);
    var newcomment = new Review(req.body); 
    console.log(newcomment); 
    newcomment.save(function(err, post) { 
      if(err) {console.log("Save error");}
      else {
        console.log("Save worked");
        console.log(post);
        res.sendStatus(200);  
      }
    });
});

router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    console.log(req.query);
    var searchName = req.query["q"];
    console.log(searchName);
    var obj = {};
    if(searchName) {
      obj = {Name: searchName};
    }
    Review.find(obj,function(err,reviewList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
        console.log(reviewList); //Otherwise console log the comments you found
        res.json(reviewList); //Then send the comments
      }
    });
});

module.exports = router;
