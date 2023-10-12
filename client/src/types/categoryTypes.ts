export interface CategoriesTypes {
  status: string;
  result: number;
  data: {
    name: string;
    id: string;
    products: {
      productId: string;
    }[];
  }[];
}

export interface CategoryTypes {
  status: string;
  data: {
    name: string;
    id: string;
    products: {
      productId: string;
    }[];
  };
}
