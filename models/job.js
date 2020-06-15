
const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },

    jobUrl: {
        type: String,
        required: [true, 'Job Url is required']
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        default: 'pending'
    },

    resumeURL: {
        type: String,
        required: [true, 'Resume is required']
    },

    coverLetterURL: {
        type: String,
        required: [true, 'Cover Letter is required']
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Job', jobSchema);