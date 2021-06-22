import {emailIsValid} from "../../helpers/emailHelpers.js";
import connectDB from '../../middleware/connectDB.js';
import User from '../../models/user';
const API_KEY = process.env.EMAIL_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);

const message = {
    to: 'gtwebdevclub@gmail.com',
    from: 'gtwebdevclub@gmail.com',
    templateId: 'd-d84bfb4a02604407928a2c72825ccb28',
    dynamic_template_data: {}
};

/*
    API Route: /api/joinClub
    Body parameters:
        firstName (required): the first name of the new member
        lastName (required): the last name of the new member
        email (required): the email of the new member
        contactPoint (required): how the new member heard of GT WebDev
*/
const handler = async (req, res) => {
    if (req.method == "POST") {
        let body = req.body;
        if (!body.firstName) {
            res.status(400).json({result: "Failure - First name field is required"});
        } else if (!body.lastName) {
            res.status(400).json({result: "Failure - Last name field is required"});
        } else if (!body.email) {
            res.status(400).json({result: "Failure - Email field is required"});
        } else if (!emailIsValid(body.email)) {
            res.status(400).json({result: "Failure - Email is not valid"});
        } else if (!body.contactPoint) {
            res.status(400).json({result: "Failure - Contact point field is required"});
        } else {
            let user = new User(body);
            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({result: err.message});
                }
                message.dynamic_template_data = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    contactPoint: body.contactPoint
                };
                try {
                    sgMail.send(message);
                } catch (err) {
                    console.log(err);
                }
                return res.status(200).json({result: "Successfully joined club"});
            });
        }
    } else {
        res.status(400).json({result: "Failure - HTTP method type not allowed"});
    }
}

export default connectDB(handler);