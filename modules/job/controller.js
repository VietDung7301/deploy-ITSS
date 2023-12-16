const service = require("./service");

exports.getJobList = async(req, res) => {
    try {
        const { name, salary_from, salary_to, distance_from, distance_to, type, work_localtion } = req.query
        if (!name || !distance_from) {
            res.status(400).json({
                messages: 'Missing value for required field(s)'
            })
            return
        }

        const result = await service.getAllJob(name, salary_from, salary_to, distance_from, distance_to, type, work_localtion)
        res.status(200).json(result)
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            messages: 'Something went wrong!',
            content: err.messages
        })
    }
}

exports.getJobById = async(req, res) => {
    try {
        const { job_id } = req.params

        const result = await service.getJobById(job_id)
        if (result === null) {
            res.status(404).json({
                messages: 'No job found with this id'
            })
            return
        }
        res.status(200).json(result)
    } catch (err) {
        console.log('error', err)
        res.status(400).json({
            messages: 'Something went wrong!',
            content: err.messages
        })
    }
}
