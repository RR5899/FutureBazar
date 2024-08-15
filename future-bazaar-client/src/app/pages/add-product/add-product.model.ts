export class IAddProductInput {
    name: string;
    categoryId: string;
    description: string;
    stock: number;
    status: string;
    originalPrice: number;
    discountedPrice: number;
    shopId: string;
    photos: FormData;
}