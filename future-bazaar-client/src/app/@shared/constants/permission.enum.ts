export enum Permission {
    AddProducts = 'Add Products',
    EditProducts = 'Edit Products',
    ManageInventory = 'Manage Inventory',
    RequestOrderCancellation = 'Request Order Cancellation (Limited Window)',
    SetProductPrices = 'Set Product Prices',
    TrackOrderStatus = 'Track Order Status (Customer)',
    UpdateProfileInformation = 'Update Profile Information',
    ViewOrderHistory = 'View Order History (Customer)',
    ViewProducts = 'View Products',
};

export interface IPermission {
    AddProducts: boolean;
    EditProducts: boolean;
    ManageInventory: boolean;
    RequestOrderCancellation: boolean;
    SetProductPrices: boolean;
    TrackOrderStatus: boolean;
    UpdateProfileInformation: boolean;
    ViewOrderHistory: boolean;
    ViewProducts: boolean;
};