const service = require("./service");
const jwt = require("jsonwebtoken");

const jwtSecret = 'ufAnOtJeJ0Kg7dZGsHCbw5imDjQR6pK2';

exports.login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			message: "Username or Password not present",
		});
	}

	try {
		const user = await service.login(username, password);
		if (user) {
			const maxAge = '100 days';
			const token = jwt.sign(
				{ id: user.id, username: username, email: user.email, avatar: user.avatar_link },
				jwtSecret,
				{ expiresIn: maxAge }
			);
			res.cookie("jwt", token, {
				httpOnly: true,
			});
			res.status(201).json({
				message: "User successfully Logged in",
			});
		}
	} catch (err) {
		console.log('error', err)
		res.status(400).json({
			messages: 'Something went wrong!',
			content: err.messages
		})
	}
};
