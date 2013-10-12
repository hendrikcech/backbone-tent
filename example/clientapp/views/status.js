var HumanView = require('human-view')
var templates = require('../templates')


module.exports = HumanView.extend({
	template: templates.status,
	textBindings: {
		id: '.id',
		text: '.text'
	},
	events: {
		'click .delete': 'handleRemoveClick',
		'keydown .text': 'handleKeyDown'
	},
	render: function() {
		this.renderAndBind()
	},

	handleRemoveClick: function() {
		this.model.destroy()
	},
	handleKeyDown: function(e) {
		var enterKey = 13
		if(e.keyCode !== enterKey) return true
		else e.preventDefault()

		var input = this.$('.text')
		this.model.set({ text: input.html() }).save()
		input.blur()
	}
})