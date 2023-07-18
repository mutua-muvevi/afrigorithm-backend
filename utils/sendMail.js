const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SENDMAILAPIKEY);

const sendEmail = ({ recipient, subject, message }) => {
    client.transmissions
        .send({
            options: {
                sandbox: true, // Set to false when you're ready to send to real recipients
            },
            content: {
                from: process.env.SENDMAILAPIFROM, // Use your verified sender email to go to env
                subject: subject,
                html: `<html><body><p>${message}</p></body></html>`,
            },
            recipients: [{ address: recipient }],
        })
        .then((data) => console.log("Email sent successfully!"))
        .catch((err) => console.error("Error sending email:", err));
}

module.exports = sendEmail;
