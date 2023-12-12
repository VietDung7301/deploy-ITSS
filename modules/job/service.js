const { Job, Company } = require('../../models')
const { Op, Sequelize } = require("sequelize")
const { toInt } = require('../../helpers/utils')

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
                    '$Company.name$': {[Op.substring]: name}
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
    let result = await Job(DB_CONNECTION).findAll({
        attributes: [
            ['id', 'jod_id'],
            ['name', 'job_name'],
            [Sequelize.col('company.distance'), 'distance'],
            'work_location', 'skill_requirements', 'salary'
        ],
        where: conditions,
        include: [
            {
                model: Company(DB_CONNECTION),
                as: 'company',
                attributes: ['id', 'name', 'image']
            }
        ]
    })
    return result
}
