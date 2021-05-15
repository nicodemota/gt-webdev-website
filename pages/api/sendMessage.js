import {emailIsValid} from "../../helpers/emailHelpers.js";

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
            console.log("Name: " + body.name);
            console.log("Email: " + body.email);
            console.log("Message: " + body.message);
            res.status(200).json({result: "Successfully sent message"});
        }
    } else {
        res.status(400).json({result: "Failure - HTTP method type not allowed"});
    }
}