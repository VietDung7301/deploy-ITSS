/**
 * File này khởi tạo các biến global, có thể được sử dụng trong toàn bộ chương trình
 */

const { Sequelize } = require('sequelize');
const models = require('./models')

const initModels = (db, models) => {
    for (const [key, model] of Object.entries(models)) {
        if (!db.models[key] && key != 'create_associations') model(db) 
    }
    db.models.job.belongsTo(db.models.company, {foreignKey: 'company_id'})
    db.models.company.hasMany(db.models.job, {foreignKey: 'company_id'})

    db.models.apply_job.belongsTo(db.models.job, {foreignKey: 'job_id'})
    db.models.job.hasMany(db.models.apply_job, {foreignKey: 'job_id'})

    db.models.apply_job.belongsTo(db.models.user, {foreignKey: 'user_id'})
    db.models.user.hasMany(db.models.apply_job, {foreignKey: 'user_id'})
}

module.exports = async (server) => {
    global.DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;

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
