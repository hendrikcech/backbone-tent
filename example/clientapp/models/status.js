var HumanModel = require('human-model')

var BBTent = require('../../..')


module.exports = HumanModel.define({
	props: {
		id: ['string'],
		text: ['string'],
		_post: ['object'],
		location: ['object']
	},
	initialize: function() {
		this.sync = new BBTent({
			type: 'https://tent.io/types/status/v0',
			meta: window.user.meta,
			auth: window.user.auth
		})
	}
})