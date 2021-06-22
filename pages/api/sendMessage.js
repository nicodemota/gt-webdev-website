import {emailIsValid} from "../../helpers/emailHelpers.js";
const API_KEY = process.env.EMAIL_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);

const message = {
    to: 'gtwebdevclub@gmail.com',
    from: 'gtwebdevclub@gmail.com',
    templateId: 'd-f08784fd6bb54c288ac583e16c7195aa',
    dynamic_template_data: {}
};

/*
    API Route: /api/sendMessage
    Body parameters:
        name (required): the name of the person sending the message
        email (required): the email of the person sending the message
        message (required): the message to send to gt-webdev
*/
export default (req, res) => {
    if (req.method == "POST") {
        let body = req.body;
        if (!body.name) {
            res.status(400).json({result: "Failure - Name field is required"});
        } else if (!body.email) {
            res.status(400).json({result: "Failure - Email field is required"});
        } else if (!emailIsValid(body.email)) {
            res.status(400).json({result: "Failure - Email is not valid"});
        } else if (!body.message) {
            res.status(400).json({result: "Failure - Message field is required"});
        } else {
            message.dynamic_template_data = {
                "name": body.name,
                "userEmail": body.email,
                "message": body.message
            }
            try {
                sgMail.send(message);
                res.status(200).json({result: "Successfully sent message"});
            } catch(err) {
                console.log(err);
                res.status(500).json({result: "Email failed to send - internal service error"});
            }
        }
    } else {
        res.status(400).json({result: "Failure - HTTP method type not allowed"});
    }
}