var HumanView = require('human-view')
var templates = require('../templates')
var StatusView = require('../views/status')

module.exports = HumanView.extend({
	template: templates.page,
	events: {
		'click .create': 'handleCreateClick'
	},
	render: function() {
		this.renderAndBind()
		this.renderCollection(this.collection, StatusView, this.$('.posts')[0])
		if(!this.collection.length) {
			this.collection.fetch()
		}
	},

	handleCreateClick: function() {
		var rndNum = Math.floor(Math.random() * 1000)
		var text = 'Random Status No. ' + rndNum
		this.collection.add({ text: text }).save()
	}
})