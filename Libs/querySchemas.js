const { celebrate, Joi, Segments } = require('celebrate')

exports.default = {
	default: celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required(),
			id_user: Joi.string().guid().required(),
			id_group: Joi.string().guid().required(),
			id_agency: Joi.string().guid().required(),
			id_company: Joi.string().guid().required(),
		}).unknown(),
	}),
}
