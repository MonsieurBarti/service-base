module.exports = (sequelize, DataTypes) => {
	// test
	const APILogs = sequelize.define(
		'apilogs',
		{
			service: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			method: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			request: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			payload: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
			response: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			id_user: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			datetime: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{ timestamps: false }
	)

	return APILogs
}
