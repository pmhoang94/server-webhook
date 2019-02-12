const VALIDATION_TOKEN = '123456'

var http = require('http')
var bodyParser = require('body-parser')
var express = require('express')

var app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
var server = http.createServer(app)

app.get('/', (req, res) => {
  res.send('Home page. Server running okay.')
})
 
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong validation token')
})

app.post('/webhook', function(req, res) {
  var fbChanges = req.body.entry[0].changes
  console.log(JSON.stringify(fbChanges))
  console.log(JSON.stringify(req.body))
  res.status(200).send(fbChanges)
})

app.set('port', process.env.PORT || 5000)
app.set('ip', process.env.IP || '0.0.0.0')

server.listen(app.get('port'), app.get('ip'), function() {
  console.log('Chat bot server listening at %s:%d ', app.get('ip'), app.get('port'))
})
