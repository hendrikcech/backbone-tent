var Backbone = require('backbone')
var BBTent = require('./backbone-tent')
var config = require('./config')

var bbTent = new BBTent({
	type: 'http://bo.ok/v0',
	meta: config.meta,
	auth: config.auth
})

var Book = Backbone.Model.extend({
	defaults: {
		title: '',
		finished: false
	},

	sync: bbTent
})

var Library = Backbone.Collection.extend({
	model: Book,

	sync: bbTent
})

var library = new Library
library.fetch()
//library.create({ title: 'Lord of the Rings' })
//library.get(1).set('finished', true).save()


//library.on('reset add remove change', function(model) {
//	console.log(model.toJSON())
//})

var repl = require('repl').start({
  prompt: "> ",
  input: process.stdin,
  output: process.stdout
})

function rndNum() {
	return Math.floor(Math.random() * 1000)
}

repl.context.l = library
repl.context.ls = function() {
	return console.log(require('util').inspect(library.toJSON(), { depth: 1 }))
}
repl.context.insert = function() {
	library.create({ title: 'Lord of the ' + rndNum() + ' Rings'})
}
repl.context.update = function() {
	var model = library.at(0)
	model.set({
		title: 'Updated ' + rndNum(),
		finished: !(model.get('finished'))
	})
	model.save()
}