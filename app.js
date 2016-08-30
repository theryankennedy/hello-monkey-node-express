const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const callerId = process.env.TWILIO_NUMBER;
const defaultClientName = "ryan";

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

app.all('/voice', (req, res) => {

  const phoneNumber = req.body.PhoneNumber;
  const twiml = new twilio.TwimlResponse();

  const numberDialer = function(dial) {
      dial.number(phoneNumber);
  };

  const clientDialer = function(dial) {
      dial.client(phoneNumber);
  };

  const phoneNumberRegEx = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/igm

  if (phoneNumber && phoneNumber.match(phoneNumberRegEx)) {
    twiml.dial({callerId : callerId}, numberDialer);
  }else {
    twiml.dial({callerId : callerId}, clientDialer);
  }

  res.send(twiml.toString());

});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
