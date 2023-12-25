const { job, company, user, apply_job, notify } = require('../../models');
const { Op, Sequelize } = require("sequelize");
const { toInt } = require('../../helpers/utils');
const { upload_file_to_dropbox } = require('../../helpers');

/**
 * Lấy danh sách công việc dựa theo các tiêu chí bên dưới
 * @param {string} name 
 * @param {int} salary_from 
 * @param {int} salary_to 
 * @param {int} distance_from 
 * @param {int} distance_to 
 * @param {string} type 
 * @param {string} work_localtion 
 */
exports.getAllJob = async (name, salary_from, salary_to, distance_from, distance_to, type, work_localtion) => {
    salary_from = toInt(salary_from)
    salary_to = toInt(salary_to)
    distance_from = toInt(distance_from)
    distance_to = toInt(distance_to)
    let conditions = {}
    if (name) {
        conditions = {
            [Op.or]: [
                {
                    name: {[Op.substring]: name}
                },
                {
                    '$company.name$': {[Op.substring]: name}
                }
            ]
        }
    }
    if (salary_from) {
        conditions['salary'] = { [Op.gte]: salary_from }
    }
    if (salary_to) {
        conditions['salary'] = {...conditions['salary'], [Op.lte]: salary_to}
    }
    if (distance_from) {
        conditions['$company.distance$'] = { [Op.gte]: distance_from }
    }
    if (distance_to) {
        conditions['$company.distance$'] = {...conditions['$company.distance$'], [Op.lte]: distance_to }
    }
    if (type) {
        conditions['type'] = type
    }
    if (work_localtion) {
        conditions['work_localtion'] = work_localtion
    }
    let result = await job(DB_CONNECTION).findAll({
        attributes: [
            ['id', 'job_id'],
            ['name', 'job_name'],
            [Sequelize.col('company.distance'), 'distance'],
            'work_location', 'skill_requirements', 'salary'
        ],
        where: conditions,
        include: [
            {
                model: company(DB_CONNECTION),
                attributes: ['id', 'name', 'image']
            }
        ]
    })
    return result
}

/**
 * Lấy thông tin chi tiết 1 công việc theo id
 * @param {*} id 
 */
exports.getJobById = async (id) => {
    id = toInt(id)
    let result = await job(DB_CONNECTION).findOne({
        where: {
            id: id
        },
        attributes: [
            ['id', 'job_id'],
            ['name', 'job_name'],
            [Sequelize.col('company.distance'), 'distance'],
            'work_location', 'skill_requirements', 'salary', 'type', 'description'
        ],
        include: [
            {
                model: company(DB_CONNECTION),
                attributes: ['id', 'name', 'image', 'address', 'type', 'scale', 'nation', 'time_work', 'is_overtime']
            }
        ]
    })
    return result
}

/**
 * Thêm thông tin apply job của user
 * @param {int} job_id 
 * @param {int} user_id 
 * @param {string} name 
 * @param {boolean} use_current_cv 
 * @param {string} intro_letter 
 * @param {File} file 
 */
exports.applyJob = async (job_id, user_id, name, use_current_cv, intro_letter, file) => {
    if (use_current_cv == 'no') {
        let user_cv = await upload_file_to_dropbox(file.path, file.filename, user_id);
        await user(DB_CONNECTION).update(
            {
                cv_link: user_cv.path,
                cv_name: file.originalname,
                full_name: name
            },{
                where: {id: user_id},
            });
    }
    let { company_id } = await job(DB_CONNECTION).findOne({
        where: { id: job_id },
        attributes: ['company_id'],
    });
    apply_job(DB_CONNECTION).create({
        intro_letter: intro_letter,
        job_id: job_id,
        user_id: user_id
    });
    notify(DB_CONNECTION).create({
        user_id: user_id,
        job_id: job_id,
        company_id: company_id,
        message: `Ứng tuyển thành công`,
    });
    return true;
}
