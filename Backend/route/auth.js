const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


router.post("/userData", async (req, res) => {
	  
	const { token } = req.body;
	const keyPrivate = process.env.JWTPRIVATEKEY;
	try {
	  const user = jwt.verify(token, keyPrivate, (err, res) => {
		if (err) {
		  return "token expired";
		}
		return res;
	  });
	  console.log(user);
	  if (user == "token expired") {
		return res.send({ status: "error", data: "token expired" });
	  }
  
	  const userName = user.firstName;
	  User.findOne({ fistName: userName })
		.then((data) => {
		  res.send({ status: "ok", data: data });
		})
		.catch((error) => {
		  res.send({ status: "error", data: error });
		});
	} catch (error) {console.log(error) }
  });


module.exports = router;