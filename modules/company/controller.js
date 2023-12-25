const service = require('./service');
const { toInt } = require('../../helpers/utils')

exports.getCompanyInformation = async (req, res) => {
	try {
		let { company_id } = req.params;
		company_id = toInt(company_id);

		let result = await service.getCompanyInformation(company_id);
		
		if (result) {
			return res.status(200).json(result);
		}
		return res.status(400).json({
			messane: 'Not found company with this id',
		})
	} catch (err) {
		console.log('error', err)
		res.status(400).json({
			message: 'Something went wrong!',
			content: err.messages
		})
	}
};
