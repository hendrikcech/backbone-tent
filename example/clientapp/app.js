var Backbone = require('backbone')
var HumanView = require('human-view')

var templates = require('./templates')
var PageView = require('./views/page')
var User = require('./models/user')
var StatusPosts = require('./models/statusPosts')

var self = window.app = this

window.templates = templates
window.user = new User()

this.statusPosts = new StatusPosts()

$(function() {
	var pageView = new PageView({
		collection: self.statusPosts,
		el: document.body
	})

	pageView.render()
})