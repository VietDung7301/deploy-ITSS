const service = require("./service");

exports.test = async(req, res) => {
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
