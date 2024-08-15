import { RolePermissionDTO } from "src/role-permission/dto/role-permission.dto";

export interface IUserInfoOutputModel {
    userDetails: IUserDetail;
    shopDetails?: IShopDetail;
    rolePermissions: RolePermissionDTO[]
}

export interface IUserDetail {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IShopDetail {
    shopId: string;
    shopName: string;
}