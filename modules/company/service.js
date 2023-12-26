const { company, job, apply_job } = require('../../models');
const { Sequelize } = require('sequelize');


/**
 * Lấy thông tin chi tiết của công ty và danh sách các công việc mà công ty
 * đang tuyển dụng
 * @param {int} company_id 
 * @returns 
 */
exports.getCompanyInformation = async (company_id) => {
    let result = await company(DB_CONNECTION).findOne({
        where: {
            id: company_id
        },
        attributes: [
            ['id', 'company_id'],
            'name', 'image', 'address', 'type', 'scale', 'nation', 'time_work', 'is_overtime', 'introduction', 'website', 'fanpage', 'distance',
        ],
        include: [
            {
                model: job(DB_CONNECTION),
                attributes: ['id', 'name', 'work_location', 'salary', 'skill_requirements']
            }
        ],
    })
    return result;
};

/**
 * Kiểm tra user đã dăng ký ứng tuyển vào công ty hay chưa
 * @param {int} user_id 
 * @param {int} company_id 
 * @returns {boolean}
 */
exports.checkApplied = async (user_id, company_id) => {
    let result = await apply_job(DB_CONNECTION).findOne({
        where: {
            user_id: user_id,
            '$job.company_id$': company_id
        },
        attributes: ['id'],
        include: [{
            model: job(DB_CONNECTION),
            attributes: []
        }]
    });
    if (result === null) {
        return false;
    }
    return true;
}
