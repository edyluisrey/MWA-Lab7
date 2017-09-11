var express = require('express');
const crypto = require('crypto');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var encrypted ='';
var credendial ={algort: 'aes256', password:'asaadsaad'};

mongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
    if(err) throw err;
    db.collection('homework7').findOne({}, function(err, doc){
    	if(err) throw err;
    	encrypted= doc.message;
    	db.close();
    });
});
/* Message */
router.get('/', function(req, res, next) {	
  const decipher = crypto.createDecipher(credendial.algort, credendial.password);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  res.render('secret', { title: 'Secret Message' , message: decrypted});
});

module.exports = router;