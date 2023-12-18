const { DataTypes } = require('sequelize');

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    time_banned: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    introduction: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    education_level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    certificate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prize: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cv_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

module.exports = (db) => {
    if (!db.models.user) {
        return db.define('user', UserSchema, {
            freezeTableName: true
        })
    }
    return db.models.user
}
