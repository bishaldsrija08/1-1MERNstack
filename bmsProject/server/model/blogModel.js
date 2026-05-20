const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ // creating a schema for the blog model
    blogTitle: {
        type: String,
        require: true
    },
    blogSubTitle: {
        type: String,
        require: true
    },
    blogDescription: {
        type: String,
        require: true
    }
},{
    timestamps: true // this will automatically add createdAt and updatedAt fields to the schema
})

const Blog = mongoose.model('Blog', blogSchema); // creating a model named Blog using the blogSchema

module.exports = Blog; // exporting the Blog model to be used in other parts of the application