var express = require('express')
var Moonboots = require('moonboots')
var templatizer = require('templatizer')

var app = express()

app.use(express.compress())
app.use(express.static(__dirname + '/public'))
app.use(express.bodyParser())
app.use(express.cookieParser())
app.set('view engine', 'jade')

var clientApp = new Moonboots({
	main: __dirname + '/clientapp/app.js',
	developmentMode: true,
	sourceMaps: false,
	libraries: [
		__dirname + '/clientapp/libraries/zepto.js'
	],
	server: app,
	beforeBuild: function() {
		var clientFolder = __dirname + '/clientapp'
		templatizer(clientFolder + '/templates', clientFolder + '/templates.js')
	}
})

app.get('*', clientApp.html())

var port = 8001
app.listen(port)
console.log('listening on :%s', port)