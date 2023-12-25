const { user } = require('../../models')


exports.getUserCv = async (user_id) => {
    let user_cv = await user(DB_CONNECTION).findOne({
        where: {id: user_id},
        attributes: ['cv_link', 'cv_name']
    });
    if (!user_cv) {
        user_cv = {
            cv_link: null,
            cv_name: null
        }
    }
    return user_cv;
};
