const SendEmail = require("../../utils/sendMail");
const logger = require("../../utils/logger");
const ErrorResponse = require("../../utils/errorResponse");
const Quotation = require("../../model/quotation/quotation");

exports.postQuotation = async (req, res, next) => {
	const { fullname, telephone, email, service, description } = req.body;

	try {
		console.log("The request is", req.body)
		
		if (!fullname) {
			return next(new ErrorResponse("Fullname is required", 400));
		}

		if (!email) {
			return next(new ErrorResponse("Email is required", 400));
		}

		if (!description) {
			return next(new ErrorResponse("Quotation description is required", 400));
		}

		const emailHTML = `
				<h1>Quotation Message</h1>
				<h2>From: ${fullname}</h2>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Service:</strong> ${service}</p>
				${telephone ? `<p><strong>Telephone:</strong> ${telephone}</p>` : ""}
				<p><strong>Message:</strong></p>
				<p>${description}</p>
			`;

		//sending the email
		const emailData = {
			to: "info@afrigorithm.com",
			from: process.env.SENDMAILAPIFROM,
			subject: `Received quotation from : ${fullname}`,
			html: emailHTML,
		};

		const response = await SendEmail(emailData)

		const quotation = Quotation.create({ fullname, telephone, email, service, description })

		if(!quotation){
			return next(new ErrorResponse("Something went wrong while sending quotation", 400))
		}

		console.log("The quotation is", quotation)

		res.status(200).json({
			success: true,
			data: quotation,
			message: "Quotation was sendsuccessfully"
		})

	} catch (error) {
		logger.error(`Caught send contact error: ${JSON.stringify(error)}`);
		next(error);
	}
};
