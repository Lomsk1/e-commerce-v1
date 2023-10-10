import mongoose, { Document, Model } from "mongoose";

// An interface that describes the properties
// that are required to create a new Brand
interface BrandAttrs {
  name: string;
  description: string;
  thumbnail: string;
  image: string;
}

// An interface that describes the properties
// that a Brand Model has
interface BrandModel extends Model<BrandDoc> {
  build(attrs: BrandAttrs): BrandDoc;
}

// An interface that describes the properties
// that a Brand Document has
export interface BrandDoc extends Document {
  name: string;
  description: string;
  thumbnail: string;
  image: string;
}

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A brand must have a name"],
      unique: true,
    },
    description: String,
    thumbnail: String,
    image: String,
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Brand = mongoose.model<BrandDoc, BrandModel>("Brand", brandSchema);

export default Brand;
