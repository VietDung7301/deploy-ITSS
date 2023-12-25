const { Sequelize } = require('sequelize');
const models = require('../models')
require("dotenv").config();

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

    db.models.notify.belongsTo(db.models.user, {foreignKey: 'user_id'})
    db.models.user.hasOne(db.models.notify, {foreignKey: 'user_id'})

    db.models.notify.belongsTo(db.models.company, {foreignKey: 'company_id'})
    db.models.company.hasMany(db.models.notify, {foreignKey: 'company_id'})
}

const initDB = async () => {
    console.log("Starting init database. Please wait...\n");

    /**
     * 1. Tạo kết nối đến database
     */
    let connectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            db: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
        }

    const sequelize = new Sequelize(connectOptions.db, connectOptions.user, connectOptions.pass, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    })

    

    /**
     * Xóa dữ liệu cũ và khởi tạo dữ liệu mới
     */
    initModels(sequelize, models)

    console.log("@Setup new database")
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");

    //data
    

    // systemDB.close();
    console.log("\n\nDone. Initial database successfully.");
}

initDB().catch(error => {
    console.log(error);
    process.exit();
})
