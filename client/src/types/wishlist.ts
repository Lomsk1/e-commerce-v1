import { ProductType } from "./product";

export interface WishlistType {
  status: string;
  result?: number;
  data: {
    wishlistItems: {
      product: string;
      user: string;
      id: string;
    }[];
    productDetails: ProductType[];
  };
}
