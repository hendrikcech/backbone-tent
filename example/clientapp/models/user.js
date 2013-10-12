var HumanModel = require('human-model')

var userData = require('../../../config')

module.exports = HumanModel.define({
	type: 'user',
	props: {
		entity: ['string', false, userData.meta.entity],
		meta: ['object', false, userData.meta],
		auth: ['object', false, userData.auth]
	},
	derived: {
		loggedIn: {
			deps: ['auth'],
			cache: true,
			fn: function() {
				return Boolean(this.auth)
			}
		}
	}
})