const jwt = require('jsonwebtoken')

module.exports = token => {
	return (req, res, next) => {
		if (token === 'required') {
			if (req.headers.id_user && req.headers.id_agency && req.headers.id_group && req.headers.id_company) return next()
			if (req.headers.authorization) {
				jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, (err, decoded) => {
					if (err) return res.status(401).send()
					if (decoded) {
						req.headers.id_user = decoded.id_user
						req.headers.level = decoded.level
						return next()
					}
					return res.status(401).json({ error: 'Unauthorized access' })
				})
			} else {
				return res.status(401).json({ error: 'Unauthorized access' })
			}
		} else {
			next()
		}
	}
}
