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
    Address: Address;
}

export interface Product {
    Name: string;
    Id: string;
    OriginalPrice: number;
    DiscountedPrice: number;
    Shop: Shop;
    Photos: string[];
    CategoryId?: string;
    CategoryName?: string;
    Stocks?: number;
    Description?: string;
}
