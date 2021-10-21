const { request, expect, authorization } = require('./config')

describe('GET /getByID', () => {
	it('Should return an object ', async () => {
		const response = await request.get('/e713c172-bdf7-4e2f-ba24-a758a78bd39a').set(authorization)
		expect(response.status).to.eql(200)
		const attributes = response.body
		expect(attributes).to.include.keys('id_company', 'name', 'address')
	})
	it('Should throw an error ', async () => {
		const response = await request.get('/test').set(authorization)
		expect(response.status).to.eql(400)
	})
	it('Should be unauthorized', async () => {
		const response = await request.get('/e713c172-bdf7-4e2f-ba24-a758a78bd39a')
		expect(response.status).to.eql(401)
	})
})
