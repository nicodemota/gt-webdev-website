import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scheduleEntrySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    agenda: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    collection: 'scheduleEntries' 
});

const scheduleEntry = mongoose.models['scheduleEntry'] || mongoose.model('scheduleEntry', scheduleEntrySchema);

export default scheduleEntry;