const service = require("./service");

exports.getUserCv = async (req, res) => {
	try {
		const user_id = req.user.id;
		const user_cv = await service.getUserCv(user_id);
		res.status(200).json(user_cv)
	} catch (err) {
		console.log('error', err)
		res.status(400).json({
			message: 'Something went wrong!',
			content: err.messages
		})
	}
};
