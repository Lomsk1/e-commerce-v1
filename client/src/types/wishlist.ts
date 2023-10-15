export interface WishlistType {
  status: string;
  result?: number;
  data: {
    product: string;
    user: string;
    id: string;
  }[];
}
