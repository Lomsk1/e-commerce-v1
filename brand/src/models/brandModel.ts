import mongoose, { Document, Model } from "mongoose";

// An interface that describes the properties
// that are required to create a new Brand
interface BrandAttrs {
  name: string;
  description: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  image: {
    public_id: string;
    url: string;
  };

  brandCategory: {
    name: string;
    products: {
      productId: string;
    }[];
  }[];
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
  thumbnail: { public_id: string; url: string };
  image: { public_id: string; url: string };
  brandCategory: {
    name: string;
    products: {
      productId: string;
    }[];
  }[];
}

const brandSchema = new mongoose.Schema<BrandAttrs>(
  {
    name: {
      type: String,
      required: [true, "A brand must have a name"],
      unique: true,
    },
    description: String,
    thumbnail: {
      public_id: String,
      url: String,
    },
    image: {
      public_id: String,
      url: String,
    },

    brandCategory: [
      {
        name: {
          type: String,
          required: [true, "Please, add a name"],
        },
        products: [
          {
            productId: {
              type: String,
              required: [true, "Please, add a product id"],
            },
          },
        ],
      },
    ],
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
