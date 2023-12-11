const service = require("./service");

exports.getJobList = async(req, res) => {
    try {
        const { name, salary_from, salary_to, distance_from, distance_to, type, work_localtion } = req.query
        if (!name || !salary_from || !distance_from) {
            res.status(400).json({
                messages: 'Missing value for required field(s)'
            })
            return
        }

        const result = [
            {
                job_id: 5,
                job_name: "Tester(QC)",
                company: {
                        id: 1,
                        name: 'Sun*',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FPT_Software_logo.svg/1200px-FPT_Software_logo.svg.png',
                },        
                distance: 0.8,
                work_location: 'office',
                skill_requirements: ['Tester', 'QA QC'],
                salary: 1500000
            },
            {
                job_id: 5,
                job_name: "Tester(QC)",
                company: {
                        id: 1,
                        name: 'Sun*',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FPT_Software_logo.svg/1200px-FPT_Software_logo.svg.png',
                },        
                distance: 0.8,
                work_location: 'office',
                skill_requirements: ['Tester', 'QA QC'],
                salary: 1500000
            },
            {
                job_id: 5,
                job_name: "Tester(QC)",
                company: {
                        id: 1,
                        name: 'Sun*',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FPT_Software_logo.svg/1200px-FPT_Software_logo.svg.png',
                },        
                distance: 0.8,
                work_location: 'office',
                skill_requirements: ['Tester', 'QA QC'],
                salary: 1500000
            },
            {
                job_id: 5,
                job_name: "Tester(QC)",
                company: {
                        id: 1,
                        name: 'Sun*',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FPT_Software_logo.svg/1200px-FPT_Software_logo.svg.png',
                },        
                distance: 0.8,
                work_location: 'office',
                skill_requirements: ['Tester', 'QA QC'],
                salary: 1500000
            },
        ]
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({
            messages: 'Something went wrong!',
            content: err.messages
        })
    }
    
}

exports.getJobById = async(req, res) => {
    res.status(200).json({
        job_id: 5,
        job_name: 'Tester(QC)',
        company: {
            id: 1,
            name: 'Sun*',
            image: 'https://shiba.com/image/abc.jpg',
            address: 'Bách Khoa, Hai Bà Trưng, Hà Nội',
            type: 'Sản phẩm',
            scale: '50-150 nhân viên',
            nation: 'Việt Nam',
            time_work: 'Thứ 2 - thứ 6',
            is_overtime: false
        },
        distance: 0.8,
        work_location: 'office',
        skill_requirements: ['Tester', 'QA QC'],
        salary: 1500000,
        type: 'full time',
        description: 'Công việc tốt lắm',
    })
}
