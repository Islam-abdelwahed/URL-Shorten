import mongoose, { Schema } from "mongoose";
const linkSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    accessCount: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: { createdAt: true, updatedAt: true } });
linkSchema.statics.build = (attrs) => {
    return new Link(attrs);
};
const Link = mongoose.model("link", linkSchema);
export { Link };
