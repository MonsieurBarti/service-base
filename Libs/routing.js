const fs = require('fs')
const yaml = require('js-yaml')
const { postgres } = require('./postgres')
const acl = require('./acl')
const logs = require('@immosign/api_logs')
const multipart = require('connect-multiparty')()
const logger = require('./logger')
const querySchemas = require('./querySchemas')
// *************** Import routes dynamically ***************
exports.run = function (app) {
	let config = yaml.safeLoad(fs.readFileSync(__dirname + '/../Configs/routing.yml', 'utf8'))
	config.routing.forEach(routing => {
		let requireCtrl = routing.name + "=require('../Controllers/" + routing.controller + ".js');"
		let checkQuery = routing.middleware !== 'default.default' ? routing.controller.replace('/', '.') : routing.middleware
		checkQuery = querySchemas[checkQuery.split('.')[0]][checkQuery.split('.')[1]]
		let route =
			`app.` +
			routing.method.toLowerCase() +
			`('` +
			routing.path +
			`', acl(routing.token), multipart, checkQuery, (req, res) => {` +
			routing.name +
			`(req)` +
			`.then(response => {` +
			`if(response === 204) { return res.sendStatus(204) }` +
			`return res.json(response)` +
			`})` +
			`.catch(error => {` +
			`console.log(error);` +
			`logs(postgres, req, error);` +
			`logger.error(req.method + ' ' + req.url + ' ' + JSON.stringify(error.message) || error.toString() + ' -> (' + req.headers.id_user + ')');` +
			`if(error.HttpStatus) return res.status(error.HttpStatus).json({ code: error.code, error: error.message});` +
			`return res.status(400).json({ code:"ERRUNKNOWN", error: error.toString() });` +
			`})` +
			`});`
		eval(requireCtrl)
		eval(route)
	})

	// ***** 404 Not Found *****
	app.all('*', (req, res) => {
		logger.error(`${req.method} ${req.url}`)
		res.sendStatus(404)
	})
}
