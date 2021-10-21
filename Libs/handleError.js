class HttpError extends Error {
	constructor(message) {
		super(message)

		this.name = 'HttpError'
		this.HttpStatus = 400
		this.message = message
	}
}

module.exports = {
	HttpError,
}
