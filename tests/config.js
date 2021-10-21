const app = require('../server')
const request = require('supertest')(app)
const chai = require('chai')
const expect = chai.expect
chai.should()
chai.use(require('chai-like'))
chai.use(require('chai-things'))
let authorization = { Authorization: `${process.env.TOKEN}` }
module.exports = {
	request,
	expect,
	authorization,
}
