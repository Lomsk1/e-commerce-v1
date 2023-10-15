import mongoose, { Query, Document, Model } from "mongoose";

interface WishlistAttrs {
  user: mongoose.Types.ObjectId;
  product: string;
  productPopulate: () => void;
}

interface WishlistModel extends Model<WishlistDoc> {
  build(attrs: WishlistAttrs): WishlistDoc;
}
export interface WishlistDoc extends Document {
  user: mongoose.Types.ObjectId;
  product: string;
  productPopulate: () => void;
}

const wishlistSchema = new mongoose.Schema<WishlistAttrs>(
  {
    product: {
      type: String,
      required: [true, "Please, add a Product id"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please, add a User id"],
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

wishlistSchema.index({ product: 1, user: 1 });

wishlistSchema.methods.productPopulate = async function () {
  //   const query = this as Query<RecipeFavoriteDocument[], RecipeFavoriteDocument>;
  //   await query.populate({
  //     path: "recipe",
  //     select: {
  //       _id: 1,
  //       name: 1,
  //       difficulty: 1,
  //       cookingTime: 1,
  //       image: 1,
  //       author: 0,
  //       ingredients: 0,
  //       recipeCategory: 0,
  //       review: 0,
  //     },
  //   });
};

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>(
  "Wishlist",
  wishlistSchema
);

export default Wishlist;
