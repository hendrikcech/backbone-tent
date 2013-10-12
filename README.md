# backbone-tent
This project aims to make it easy to use Tent as a sync solution for Backbone models.
Currently it is in a very experimental stage. Feedback is more than welcome!

## setup
Clone this repo and do `npm install`.  
I've played around with the module in `test.js`.  
To see a client-side example, change to `/example` and do `npm install`. Duplicate `configTemplate.js` and rename it to `config.js`. Now fill in auth details for your Tent development server. Finally you can start the example with `node server`. Open a browser and navigate to `localhost:8001`.  
The backbone-tent specific code can be found in `models/status.js` and `models/statusPosts.js`.

## usage
	var BBTent = require('backbone-tent')
	var bb = require('backbone')

	var user = require('./userConfig')

	var bbTent = new BBTent({
		type: 'https://tent.io/types/status/v0',
		meta: user.meta,
		auth: user.auth
	})

	var StatusPost = Backbone.Model.extend({
		defaults: {
			text: ''
			location: {}
		},
		sync: bbTent
	})

	var StatusPosts = Backbone.Collection.extend({
		model: StatusPost,
		sync: bbTent
	})

	var statusPosts = new StatusPosts()
	statusPosts.fetch()

	statusPosts.create({ text: 'Status from backbone-tent! '})


## license
MIT