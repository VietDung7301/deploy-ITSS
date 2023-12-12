const { DataTypes } = require('sequelize');

const JobSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    work_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skill_requirements: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    description: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}

module.exports = (db) => {
    if (!db.models.Job) {
        return db.define('Job', JobSchema)
    }
    return db.models.Job
}
