/**
 * File này khởi tạo các biến global, có thể được sử dụng trong toàn bộ chương trình
 */

const { Sequelize } = require('sequelize');
const { models } = require('./models')

const initModels = (db, models) => {
    let model_list = {}
    for (const [key, value] of Object.entries(models)) {
        model_list[value.modelConfig.name] = db.define(value.modelConfig.name, value.modelConfig.attributes)
    }
    for (const [key, value] of Object.entries(models)) {
        for (let ref of value.modelConfig.foreignKey || []) {
            model_list[ref.table].hasMany(
                model_list[value.modelConfig.name],
                { foreignKey: ref.column }
            );
            model_list[value.modelConfig.name].belongsTo(model_list[ref.table]);
        }
    }
}

module.exports = async (server) => {
    let connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        db: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
    }

    global.DB_CONNECTION = new Sequelize(connectOptions.db, connectOptions.user, connectOptions.pass, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    })

    try {
        await DB_CONNECTION.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    initModels(DB_CONNECTION, models)

    console.log("Synching models")
    await DB_CONNECTION.sync();
    console.log("All models were synchronized successfully.");
}
