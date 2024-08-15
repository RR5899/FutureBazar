export class AddProductDto {
    name: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    stock: string;
    status: string;
    originalPrice: string;
    discountedPrice: string;
    shopId: string;
    createdBy: string;
    photos: FileList[];
}