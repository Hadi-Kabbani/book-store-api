const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    downloads: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    rates: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Add indexes
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ genre: 1 });

module.exports = mongoose.model('Book', bookSchema);
