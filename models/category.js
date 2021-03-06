const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    }
})
const Category = mongoose.model('category', CategorySchema)

module.exports = Category