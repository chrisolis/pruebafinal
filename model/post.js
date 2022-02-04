let mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = Schema({
    task:String,
    complete: {
        type: Boolean,
        default: false
    },
    post_date: {
        type: Date, 
        default: Date.now
    },
    user_id: String //20
});

module.exports = mongoose.model('posts', PostSchema)