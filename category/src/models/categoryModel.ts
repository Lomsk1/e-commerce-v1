import mongoose, { Document, Model } from "mongoose";

// An interface that describes the properties
// that are required to create a new Category
interface CategoryAttrs {
  name: string;

  products: {
    productId: string;
  }[];
}

// An interface that describes the properties
// that a Category Model has
interface CategoryModel extends Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

// An interface that describes the properties
// that a Category Document has
export interface CategoryDoc extends Document {
  name: string;
  products: {
    productId: string;
  }[];
}

const categorySchema = new mongoose.Schema<CategoryAttrs>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Enter Category Name"],
    },
    products: [
      {
        productId: {
          type: String,
          required: [true, "Please, add product Id"],
        },
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

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);

export default Category;