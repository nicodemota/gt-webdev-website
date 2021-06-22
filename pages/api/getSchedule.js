import connectDB from '../../middleware/connectDB.js';
import scheduleEntry from '../../models/scheduleEntry';

const handler = async (req, res) => {
    if (req.method == "GET") {
        scheduleEntry.find({}, (err, result) => {
            if (err) {
                return res.status(400).json({result: err.message});
            }
            return res.status(200).json({data: result});
        })
    } else {
        res.status(400).json({result: "Failure - HTTP method type not allowed"});
    }
}

export default connectDB(handler);