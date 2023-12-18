const { DataTypes } = require('sequelize');

const ApplyJobSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apply_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    intro_letter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

module.exports = (db) => {
    if (!db.models.apply_job) {
        return db.define('apply_job', ApplyJobSchema, {
            freezeTableName: true
        })
    }
    return db.models.apply_job
}
