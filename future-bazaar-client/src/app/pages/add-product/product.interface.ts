export interface IAddProduct {
    photos: any[];
    productName: string;
    originalPrice: number;
    category: string;
    subCategory: string;
    discountedPrice: number;
    stocks: number;
    status: string; // "Out of stock" or "In stock"
    description: string;
  }
  