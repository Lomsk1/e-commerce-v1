import { BranchType } from "./branch";

export interface ProductsType {
  status: string;
  result: number;
  data: {
    category: {
      id: string;
      name: string;
    };
    branches: {
      branch: BranchType["data"];
      inStock: boolean;
    }[];
    brand: {
      id: string;
      name: string;
      image: string;
    };

    id: string;
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

    createdAt?: Date;

    specifications: {
      category: string;
      _id: string;
      specificationBasics: {
        name: string;
        top: boolean;
        middle: string;
        _id: string;
      }[];
    }[];
  }[];
}

export interface ProductType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  status: string;
  data: {
    category: {
      id: string;
      name: string;
    };
    branches: {
      branch: BranchType["data"];
      inStock: boolean;
    }[];
    brand: {
      id: string;
      name: string;
      image: string;
    };

    id: string;
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

    createdAt?: Date;

    specifications: {
      category: string;
      _id: string;
      specificationBasics: {
        name: string;
        top: boolean;
        middle: string;
        _id: string;
      }[];
    }[];
  };
}

export interface ProductStatsTypes {
  status: string;
  total: number;
  stats: {
    _id: string;
    numProducts: number;
    numInStock: number;
    numTop: number;
    numPopular: number;
    numNew: number;
  }[];
}
