import mongoose, { Document, Model, Query } from "mongoose";
import slugify from "slugify";

// An interface that describes the properties
// that are required to create a new Product
interface ProductAttrs {
  category: {
    id: string;
    name: string;
  };
  categoryFilter: string;
  branches: {
    branch: mongoose.Schema.Types.ObjectId;
    inStock: boolean;
  }[];
  brand: {
    id: string;
    name: string;
    image: string;
  };
  brandId: string;

  title: string;
  separate: string;
  slug: string;
  description: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
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

  specifications: {
    category: string;
    specificationBasics: {
      name: string;
      middle: string;
      top: boolean;
    }[];
  }[];
}

// An interface that describes the properties
// that a Product Model has
interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

// An interface that describes the properties
// that a Product Document has
export interface ProductDoc extends Document {
  category: {
    id: string;
    name: string;
  };
  categoryFilter: string;
  branches: {
    branch: mongoose.Schema.Types.ObjectId;
    inStock: boolean;
  }[];
  brand: {
    id: string;
    name: string;
    image: string;
  };
  brandId: string;
  title: string;
  separate: string;
  slug: string;
  description: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
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

  specifications: {
    category: string;
    specificationBasics: {
      name: string;
      middle: string;
      top: boolean;
    }[];
  }[];
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
    thumbnail: {
      public_id: String,
      url: String,
    },
    amount: {
      type: Number,
      default: 1,
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

    specifications: [
      {
        category: {
          type: String,
          required: [true, "Please, add a name in specification"],
        },
        specificationBasics: [
          {
            name: {
              type: String,
              required: [true, "Please, add a name in spec basic"],
            },
            middle: {
              type: String,
              required: [true, "Please, add a middle in spec basic"],
            },
            top: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],

    branches: [
      {
        branch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Branch",
          required: [true, "Please, add a branch id"],
        },
        inStock: {
          type: Boolean,
          default: false,
        },
      },
    ],

    brand: {
      id: {
        type: String,
        required: [true, "Please, add a brand id"],
      },
      name: {
        type: String,
        required: [true, "Please, add a brand name"],
      },
      image: {
        type: String,
      },
    },
    brandId: String,
    category: {
      id: {
        type: String,
        required: [true, "Please, add a category id"],
      },
      name: {
        type: String,
        required: [true, "Please, add a category name"],
      },
    },
    categoryFilter: {
      type: String,
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

productSchema.pre(/^find/, function (next) {
  const query = this as Query<ProductDoc[], ProductDoc>;

  query.populate({
    path: "branches.branch",
    select: "_id name city address phone branchCoord branchWorkingHours",
  });

  next();
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.categoryFilter = this.category.id;
  next();
});

productSchema.index({ slug: 1 });

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export default Product;
