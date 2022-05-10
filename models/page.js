const mongoose = require('mongoose')


const PageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    sorting: {
        type: Number,
    }
})
const Page = mongoose.model('page', PageSchema)

module.exports = Page