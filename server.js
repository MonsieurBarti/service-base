const express = require('express')
const bodyParser = require('body-parser')
const routing = require('./Libs/routing')
const postgres = require('./Libs/postgres')
const rateLimit = require('express-rate-limit')
const app = express()
const expressPinoLogger = require('express-pino-logger')
const logger = require('./Libs/logger')
const cors = require('cors')
const { isCelebrateError } = require('celebrate')
const loggerMidlleware = expressPinoLogger({
	logger,
	autoLogging: false,
})

// ***** Environment variables *****
require('dotenv').config()
const port = process.env.PORT || 3000

// ***** Errors Environment Variables *****
let envRequired = ['PORT', 'TOKEN_SECRET', 'POSTGRES_URL']
let errors = []

for (let i = 0; i < envRequired.length; i++) {
	if (!process.env[envRequired[i]]) errors.push('Environment variable ' + envRequired[i] + ' required !')
}

if (errors.length > 0) {
	for (let i = 0; i < errors.length; i++) {
		console.error(errors[i])
	}
	return process.kill(process.pid)
}

// ***** Config Server *****
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(cors())
app.use(
	rateLimit({
		windowMs: 1000,
		max: process.env.MAX_REQUESTS,
		message: `You have exceeded the ${process.env.MAX_REQUESTS} requests in 1s limit!`,
		headers: true,
	})
)
app.use(loggerMidlleware)

// ***** Start Server *****
module.exports = app.listen(port, () => {
	routing.run(app)
	app.use((err, req, res, next) => {
		if (isCelebrateError(err)) {
			let error = err.details.get('body') || err.details.get('query') || err.details.get('params')
			error = error.message.replace(/\\"/g, '')
			logger.error(req.method + ' ' + req.url + ' ' + error + ' -> (' + req.headers.id_user + ')')
			return res.status(400).send(error)
		}
		return next(err)
	})
	console.log('Service %s listening on %s', process.env.SERVICE_NAME, port)
	postgres.authenticate()
})
