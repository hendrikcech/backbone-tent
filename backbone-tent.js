var request = require('tent-request')

var idPool = 0

module.exports = function bbTent(opts) {
	console.log('-- new bbTent')

	opts || (opts = {})
	if(!opts.type) throw new Error('specify post type')
	if(!opts.meta) throw new Error('specify meta post')
	if(!opts.auth) throw new Error('specify auth')

	var client = request.createClient(opts.meta, opts.auth)
	
	function sync(method, model, options) {
		console.log('-- method: %s', method)
		//console.log(model)
		//console.log(options)

		options || (options = {})

		function success(res) {
			if(options.success) options.success(res)
		}
		function error(res) {
			if(options.error) options.error(res)
		}

		switch(method) {
			case 'create':
				client.create(opts.type, createCb)
					.content(model.toJSON())

				function createCb(err, resp, body) {
					if(err) console.error(err)
					if(err) return error(err)	
					console.log(resp.statusCode)
					success({ id: body.post.id, _post: body })
				}
			break
			case 'read':
				client.query(readCb).types(opts.type)

				function readCb(err, resp, body) {
					if(err) console.error(err)
					if(err) return error(err)
					console.log(resp.statusCode)

					var result = []
					body.posts.forEach(function(post) {
						var res = post.content
						res.id = post.id
						res._post = post
						result.push(res)
					})

					success(result)
				}
			break
			case 'update':
				var post = model.toJSON()
				var versionId = post._post.version.id
				var type = post._post.type
				var id = post.id

				delete post._post
				delete post.id				

				client.update(id, updateCb)
					.parents(versionId)
					.type(type)
					.content(post)

				function updateCb(err, resp, body) {
					if(err) console.error(err)
					if(err) return error(err)
					console.log(resp.statusCode)
					success({ _post: body.post })
				}
			break
			case 'delete':
				client.delete(model.get('id'), function(err, resp) {
					if(err) console.error(err)
					if(err) return error(err)
					console.log(resp.statusCode)
					success()
				})
			break
		}
	}

	return sync
}
