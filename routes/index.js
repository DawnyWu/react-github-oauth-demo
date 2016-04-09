var express = require('express');
var router = express.Router();
var axios = require('axios')
var querystring = require('querystring')
var nconf = require('nconf')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/githubToken', function (req, res) {
  var client_id = nconf.get('client_id') 
  console.log('client_id:'+client_id)
  var client_secret = nconf.get('client_secret') 
  var code = req.query.code

  var access_token
  axios.post('https://github.com/login/oauth/access_token',
    {code: code, client_id: client_id, client_secret: client_secret})
  .then(function (response) {
    access_token = querystring.parse(response.data).access_token
    console.log('parse access_token:'+JSON.stringify(querystring.parse(response.data)));
    res.json({
      access_token: access_token
    })
  })
})

module.exports = router;
