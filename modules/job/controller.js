const service = require("./service");
const { toInt } = require('../../helpers/utils');
const { job } = require("../../models");

exports.getJobList = async(req, res) => {
    try {
        const { name, salary_from, salary_to, distance_from, distance_to, type, work_localtion } = req.query
        if (!name || !distance_from) {
            return res.status(400).json({
                message: 'Missing value for required field(s)'
            })
        }

        const result = await service.getAllJob(name, salary_from, salary_to, distance_from, distance_to, type, work_localtion)
        res.status(200).json(result)
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            message: 'Something went wrong!',
            content: err.messages
        })
    }
}

exports.getJobById = async(req, res) => {
    try {
        const { job_id } = req.params

        const result = await service.getJobById(job_id)
        if (result === null) {
            return res.status(400).json({
                message: 'No job found with this id'
            })
        }
        res.status(200).json(result)
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            message: 'Something went wrong!',
            content: err.messages
        })
    }
}

exports.applyJob = async (req, res) => {
    try {
        let { job_id } = req.params;
        const { name, use_current_cv, intro_letter } = req.body;
        const file = req.file;
        if (file) {
            file.path = file.path.replaceAll('\\', '/');
        }
        const user_id = req.user.id;
        if (!name || use_current_cv === undefined || use_current_cv == null
            || use_current_cv == false && !file) {
                return res.status(400).json({
                    message: 'Invalid parameter(s)~'
                })
            }
        
        job_id = toInt(job_id);

        const result = await service.applyJob(job_id, user_id, name, use_current_cv, intro_letter, file);
        if (result == true) {
            return res.status(200).json({
                message: 'Upload successed!'
            })
        }
        return res.status(400).json({
            message: 'Something went wrong!',
        })
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            message: 'Something went wrong!',
            content: err.messages
        })
    }
}
