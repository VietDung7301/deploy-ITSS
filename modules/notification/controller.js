const service = require("./service");

exports.getNotification = async (req, res) => {
	try {
		const user_id = req.user.id;
		let result = await service.getNotification(user_id);
		res.status(200).json(result)
	} catch (err) {
		console.log('error', err)
		res.status(400).json({
			message: 'Something went wrong!',
			content: err.messages
		})
	}
};
