import mongoose, { Document, Model } from "mongoose";
import slugify from "slugify";

// An interface that describes the properties
// that are required to create a new Product
interface ProductAttrs {
  category: string;
  brand: string;

  title: string;
  separate: string;
  slug: string;
  description: string;
  thumbnail: string;
  amount: number;
  new: boolean;
  price: number;
  totalPrice: number;
  sale: number;
  newPrice: number;
  totalNewPrice: number;
  deadline: Date;
  color: string;
  productModel: string;
  top: boolean;
  popularity: boolean;
  totalInStock: boolean;

  createdAt: Date;
}

// An interface that describes the properties
// that a Product Model has
interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

// An interface that describes the properties
// that a Product Document has
export interface ProductDoc extends Document {
  category: string;
  brand: string;

  title: string;
  separate: string;
  slug: string;
  description: string;
  thumbnail: string;
  amount: number;
  new: boolean;
  price: number;
  totalPrice: number;
  sale: number;
  newPrice: number;
  totalNewPrice: number;
  deadline: Date;
  color: string;
  productModel: string;
  top: boolean;
  popularity: boolean;
  totalInStock: boolean;

  createdAt: Date;
}

const productSchema = new mongoose.Schema<ProductAttrs>(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      unique: true,
    },
    separate: {
      /* Separate, like some words, that are similar for several products */
      type: String,
      required: [true, "A product must have a separate word"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    thumbnail: String,
    amount: {
      type: Number,
      required: [true, "A product must have an amount"],
    },
    new: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    totalPrice: {
      type: Number,
    },
    sale: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      ValidityState: {
        validator: function (val: number) {
          const productAttrs = this as ProductAttrs;

          return val < productAttrs.price;
        },
      },
    },
    totalNewPrice: Number,
    deadline: Date,
    color: {
      type: String,
      required: [true, "A product must have a color"],
    },
    productModel: {
      type: String,
    },
    top: {
      type: Boolean,
      default: false,
    },
    popularity: {
      type: Boolean,
      default: false,
    },
    totalInStock: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
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

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

productSchema.index({ slug: 1 });

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export default Product;
