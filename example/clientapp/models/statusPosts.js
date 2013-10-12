var Backbone = require('backbone')
var Status = require('./status')

var BBTent = require('../../..')


module.exports = Backbone.Collection.extend({
	model: Status,
	initialize: function() {
		this.sync = new BBTent({
			type: 'https://tent.io/types/status/v0',
			meta: window.user.meta,
			auth: window.user.auth
		})
	}
})