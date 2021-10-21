const { request, expect, authorization } = require('./config')

describe('GET /getAll', () => {
	it('Should return an array of objects', async () => {
		const response = await request.get('/').set(authorization)
		const attributes = response.body
		expect(response.status).to.eql(200)
		expect(attributes).to.be.an('array')
		attributes.should.all.have.property('id_company')
	})
	it('Should be unauthorized', async () => {
		const response = await request.get('/')
		expect(response.status).to.eql(401)
	})
})
