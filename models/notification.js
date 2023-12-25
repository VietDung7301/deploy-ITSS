const { DataTypes } = require('sequelize');

const NotifySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    job_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'job',
            key: 'id',
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'company',
            key: 'id',
        }
    },
}

module.exports = (db) => {
    if (!db.models.notify) {
        return db.define('notify', NotifySchema, {
            freezeTableName: true
        })
    }
    return db.models.notify
}
