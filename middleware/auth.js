const jwt = require("jsonwebtoken");

const jwtSecret = 'ufAnOtJeJ0Kg7dZGsHCbw5imDjQR6pK2';

exports.auth = (req, res, next) => {
	let token = req.get('Authorization');
	if (token) {
		token = token.split(' ')[1];
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(400).json({ message: "Not authorized" });
			} else {
				next();
			}
		});
	} else {
		return res
			.status(400)
			.json({ message: "Not authorized, token not available" });
	}
};
