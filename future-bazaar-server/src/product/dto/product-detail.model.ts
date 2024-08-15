export interface IProductDetailOutputModel {
    productId: string;
    productName: string;
    price: number;
    discountedPrice: number
    viewCount: number;
    photoUrls: string[];
    shopName: string;
    shopAddress?: {
        latitude: any;
        longitude: any;
        streetAddress: string;
        city: string;
        state: string;
        postalCode: number;
    };
}