const { DataTypes } = require('sequelize');

const CompanySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    nation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time_work: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_overtime: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    introduction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fanpage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

module.exports = (db) => {
    if (!db.models.company) {
        return db.define('company', CompanySchema, {
            freezeTableName: true
        })
    }
    return db.models.company
}
