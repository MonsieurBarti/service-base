require('dotenv').config()

const { Sequelize } = require('sequelize')
const path = require('path')
const fs = require('fs')
const postgres = {}

const sequelize = new Sequelize(process.env.POSTGRES_URL, { dialect: 'postgres', logging: false })

module.exports.authenticate = function () {
	sequelize
		.authenticate()
		.then(() => {})
		.catch(err => {
			console.error('Unable to connect to the database:', err)
		})
}

sequelize.sync().then(() => {})

const modelsPath = __dirname + '/../Models'
const apiLogsPath = __dirname + '/../node_modules/@monsieurbarti/api_logs/Models/apilogs.js'
// copy logs if they don't exist
if (!fs.existsSync(modelsPath + '/apilogs.js')) fs.copyFileSync(apiLogsPath, modelsPath + '/apilogs.js')

// check if logs are synced
let modelsLogs = fs.readFileSync(modelsPath + '/apilogs.js')
let node_modulesLogs = fs.readFileSync(apiLogsPath)
if (!node_modulesLogs.equals(modelsLogs)) fs.copyFileSync(apiLogsPath, modelsPath + '/apilogs.js')

// import all models
fs.readdirSync(modelsPath).forEach(file => {
	let model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes)
	postgres[model.name] = model
})

postgres.sequelize = sequelize
postgres.Sequelize = Sequelize
module.exports.postgres = postgres
