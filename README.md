# backbone-tent
This project aims to make it easy to use Tent as a sync solution for Backbone models.
Currently it is in a very experimental stage. Feedback is more than welcome!

## usage
Clone this repo and do `npm install`.  
I've played around with the module in `test.js`.  
To see a client-side example, change to `/example` and do `npm install`. Duplicate `configTemplate.js` and rename it to `config.js`. Now fill in auth details for your Tent development server. Finally you can start the example with `node server`. Open a browser and navigate to `localhost:8001`.  
The backbone-tent specific code can be found in `models/status.js` and `models/statusPosts.js`.

## license
MIT