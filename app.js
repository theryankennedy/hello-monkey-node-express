const express = require("express");
const path = require('path');
const router = express.Router();
const twilio = require("twilio");
var bodyParser = require('body-parser');

const app = express();

// view engine setup
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));

// set in env
const callerId = process.env.TWILIO_NUMBER;
const defaultClientName = "ryan";

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/client', (req, res) => {

  const clientName = req.query.client_name || defaultClientName;

  const capability = new twilio.Capability(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
  );
  capability.allowClientOutgoing(process.env.TWILIO_APP_SID);
  capability.allowClientIncoming(clientName);

  const capToken = capability.generate();

  res.render('client', { token: capToken, client_name: clientName});

});

app.post('/voice', (req, res) => {

  const phoneNumber = req.body.PhoneNumber;
  const twiml = new twilio.TwimlResponse();

  const numberDialer = function(dial) {
      dial.number(phoneNumber);
  };

  const clientDialer = function(dial) {
      dial.client(defaultClientName);
  };

  if (phoneNumber != null) {
    twiml.dial({callerId : callerId}, numberDialer);
  }else {
    twiml.dial({callerId : callerId}, clientDialer);
  }

  res.send(twiml.toString());

});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
