const { notify, company } = require('../../models');
const { Sequelize } = require('sequelize');

/**
 * Lấy danh sách thông báo của user
 * Sắp xếp theo thứ tự giảm dần của timestamp
 * @param {int} user_id 
 * @returns 
 */
exports.getNotification = async (user_id) => {
    let notif = await notify(DB_CONNECTION).findAll({
        where: {user_id: user_id},
        attributes: [
            ['id', 'notification_id'],
            'job_id', 'company_id', 
            ['createdAt', 'apply_time'],
            [Sequelize.col('company.name'), 'company_name'],
        ],
        include: [
            {
                model: company(DB_CONNECTION),
                attributes: []
            }
        ],
        order: [['apply_time', 'DESC']]
    });
    return notif;
};
