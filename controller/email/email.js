const SendEmail = require("../../utils/sendMail");
const logger = require("../../utils/logger");
const ErrorResponse = require("../../utils/errorResponse");
const Email = require("../../model/email/email");

exports.postEmail = async (req, res, next) => {
	const { email } = req.body;

	try {
		if (!email) {
			return next(new ErrorResponse("Email is required", 400));
		}

		const email = Email.create({ email })

		if(!email){
			return next(new ErrorResponse("Something went wrong while creating Email", 400))
		}

		res.status(200).json({
			success: true,
			data: email,
			message: "Email was created successfully"
		})

	} catch (error) {
		logger.error(`Caught post email error: ${JSON.stringify(error)}`);
		next(error);
	}
};
