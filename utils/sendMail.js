const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SENDMAILAPIKEY);

const SendEmail = async ({ to, from, subject, html }) => {
	const response = await client.transmissions.send({
		options: {
			sandbox: true,
		},
		content: {
			from,
			subject,
			html,
		},
		recipients: [{ address: to }],
	});

	return response;
};

module.exports = SendEmail ;
