import mongoose, { Aggregate, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0 // Duration should not be negative
    },
    views: {
        type: Number,
        default: 0, // Default views count is 0
        min: 0 // Views should not be negative
    },
    isPublished: {
        type: Boolean,
        default: true 
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true // Owner is required
    },

},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);  

export const Video = mongoose.model("Video", videoSchema);  