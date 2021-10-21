const pino = require('pino')

const levels = {
	http: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
}

module.exports = pino({
	prettyPrint: {
		colorize: true,
		levelFirst: true,
		translateTime: 'yyyy-dd-mm, h:MM:ss TT',
	},
	customLevels: levels,
	useOnlyCustomLevels: true,
	level: 'http',
})
