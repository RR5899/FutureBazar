export interface Address {
    StreetAddress?: string;
    City?: string;
    State?: string;
    PostalCode?: string;
    Country?: string;
    Latitude?: any;
    Longitude?: any;
}

export interface Shop {
    ShopId: string;
    Name: string;
    PhoneNumber: number;
    Address: Address;
}

export interface IProduct {
    Name: string;
    Id: string;
    OriginalPrice: number;
    DiscountedPrice: number;
    Shop: Shop;
    Photos: string[];
    Distance: string;
    CategoryId: string;
    Stock: number;
    Description: string;
    SubcategoryId: string;
}
