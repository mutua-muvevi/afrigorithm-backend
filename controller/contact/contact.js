const SendEmail = require("../../utils/sendMail");
const logger = require("../../utils/logger");
const ErrorResponse = require("../../utils/errorResponse");

exports.contactMessage = async (req, res, next) => {
	const { fullname, telephone, email, message } = req.body;

	try {
		console.log(response)
		if (!fullname) {
			return next(new ErrorResponse("Fullname is required", 400));
		}

		if (!email) {
			return next(new ErrorResponse("Email is required", 400));
		}

		if (!message) {
			return next(new ErrorResponse("Contact Message is required", 400));
		}

		const emailHTML = `
				<h1>Contact Message</h1>
				<h2>From: ${fullname}</h2>
				<p><strong>Email:</strong> ${email}</p>
				${telephone ? `<p><strong>Telephone:</strong> ${telephone}</p>` : ""}
				<p><strong>Message:</strong></p>
				<p>${message}</p>
			`;

		//sending the email
		const emailData = {
			to: "info@afrigorithm.com",
			from: process.env.SENDMAILAPIFROM,
			subject: `Contact Messafe from : ${fullname}`,
			text: emailHTML,
		};

		const response = await SendEmail(emailData)

		res.status(200).json({
			success: true,
			data: response,
			message: "Message sent successfully"
		})

	} catch (error) {
		logger.error(`Caught send contact error: ${JSON.stringify(error)}`);
		next(error);
	}
};
