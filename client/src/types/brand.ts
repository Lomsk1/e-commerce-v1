export interface brandType {
  message: string | null;
  status: string;
  data: {
    id: string;
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
      _id: string;
      name: string;
      categoryId: string;
      products: {
        productId: string;
      }[];
    }[];
  };
}

export interface brandsTypes {
  status: string;
  result: number;
  data: {
    id: string;
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
      _id: string;
      name: string;
      categoryId: string;
      products: {
        productId: string;
      }[];
    }[];
  }[];
}
