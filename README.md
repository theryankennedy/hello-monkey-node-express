# hello-monkey-node-express

This is a port of the python hello-monkey Twilio Client demo to node.

An effort was made to keep this as close as possible to the python version for comparative purposes.  It uses handlebars as the template engine to keep a similar html document.

The source code and tutorial for the full system comes from the excellent Twilio Quickstart guide here: <https://www.twilio.com/docs/quickstart/python/client> .  This is a great way to get a browser call going - you can use this app to make calls from the browser - to any browser or any phone number.

If you follow that tutorial (which I highly encourage you to do so), you will have a full understanding of how to make phone calls from your browser, using the Twilio javascript client.  You will need to follow all the steps to have a local development environment, and walk through creating a Twilio client in the language of your choice.


## Running Locally ##

### Requirements ###
node v6.x.x

You will need to define four environmental variables:
TWILIO_ACCOUNT_SID - Your Twilio Account Sid, found right at the top of your console home landing page.
TWILIO_AUTH_TOKEN - Your Twilio Auth Token, found right below the account sid.
TWILIO_APP_SID - The SID of a TwiML App.  Programmable Voice --> Tools --> TwiML Apps.
TWILIO_NUMBER - A Twilio phone number you purchased and configured to use the previously mentioned TwiML App. Use the + and numbers, no parens or dashes.

### running it ###
git clone
cd hello-monkey-node-express
npm install
node .

and in a new console window, open an ngrok session:
ngrok http 3000

Just one more step!  Take your new ngrok URL that you just created (for example http://f2938hf29.ngrok.io) and:

* Locate the Twilio Twiml App application you created in the pre reqs (Find this in your Twilio account DevTools > Twiml Apps or <https://www.twilio.com/user/account/apps>)
  * Update Twilio App Voice "Request URL": http://f2938hf29.ngrok.io/voice. This is the action that will be called when a user presses the "Call" button on the webpage.  

Then go to https://localhost:3000/client in your browser.  That's it!  You can now make and receive calls from your browser.  
