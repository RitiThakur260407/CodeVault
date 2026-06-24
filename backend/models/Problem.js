const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    title: {
        type: String,
        required: [true, 'Please add a problem title'],
        trim: true
    },
    platform: {
        type: String,
        required: [true, 'Please specify the platform (e.g., Codeforces, LeetCode)'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a difficulty rating'],
    },
    tags: {
        type: String, 
        required: [true, 'Please add at least one tag'],
        trim: true
    },
    status: {
        type: String,
        required: [true, 'Please select a status'],
        enum: ['Solved', 'Needs Upsolve'], 
        default: 'Solved'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Problem', problemSchema);