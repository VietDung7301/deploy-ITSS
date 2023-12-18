const { user } = require('../../models')

/**
 * Authiticate user by username/password
 * @param {string} username 
 * @param {string} password 
 */
exports.login = async (username, password) => {
    const _user = await user(DB_CONNECTION).findOne({
        where: {
            username: username,
            password: password
        }
    });
    return _user;
};
