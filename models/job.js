const { DataTypes } = require('sequelize');

const modelConfig = {
    name: 'job',
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
}

module.exports = { modelConfig }
