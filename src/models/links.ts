import mongoose, { mongo, Schema } from "mongoose";

interface LinkAttrs {
  url: string;
  shortCode: string;
  accessCount?:Number
}

interface LinkModel extends mongoose.Model<any> {
  build(attrs: LinkAttrs): any;
}

interface UserDoc extends LinkAttrs, mongoose.Document {
  createdAt: string;
  updatedAt: string;
  
}
const linkSchema = new Schema(
  {
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
    accessCount:{
        type: Number,
        required:true,
        default: 0
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

linkSchema.statics.build = (attrs: LinkAttrs) => {
  return new Link(attrs);
};

const Link = mongoose.model<UserDoc, LinkModel>("link", linkSchema);

export { Link };
