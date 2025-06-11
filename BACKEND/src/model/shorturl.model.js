import mongoose from 'mongoose';

const shortUrlSchema = mongoose.Schema({
    fullUrl : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    clicks : {
        type : Number,
        required : true,
        default : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
})

const shortUrl = mongoose.model("shortUrl",shortUrlSchema)
export default shortUrl