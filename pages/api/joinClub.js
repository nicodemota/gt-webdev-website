import {emailIsValid} from "../../helpers/emailHelpers.js";
import connectDB from '../../middleware/connectDB.js';
import User from '../../models/user';

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
            console.log("First Name: " + body.firstName);
            console.log("Last Name: " + body.lastName);
            console.log("Email: " + body.email);
            console.log("Contact Point: " + body.contactPoint);
            let user = new User(body);
            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({result: err.message});
                }

                return res.status(200).json({result: "Successfully joined club"});
            });
        }
    } else {
        res.status(400).json({result: "Failure - HTTP method type not allowed"});
    }
}

export default connectDB(handler);