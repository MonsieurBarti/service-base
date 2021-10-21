const { postgres } = require('../Libs/postgres')
const connector = require('@immosign/connector')

module.exports = async req => {
	try {
		let headers = {
			authorization: req.headers.authorization,
			id_user: req.headers.id_user,
			id_group: req.headers.id_group,
			id_agency: req.headers.id_agency,
			id_company: req.headers.id_company,
		}
		let companies = await connector.get(`${process.env.API}/companies/${req.params.id_company}`, { headers })
		return companies.data
	} catch (error) {
		console.log(error)
		throw error
	}
}
