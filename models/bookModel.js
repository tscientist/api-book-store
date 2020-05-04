const struct = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    }
})

module.exports = db.model('books', struct);