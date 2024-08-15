export class IPermissionOutputModel {
    permissionId: string;
    permissionName: string;
}

export class IRolePermissionOutputModel {
    roleId: string;
    roleName: string;
    permissions: IPermissionOutputModel[];
  }

export interface IUserInfoOutputModel {
    userDetails: IUserDetail;
    shopDetails?: IShopDetail;
    rolePermissions: IRolePermissionOutputModel[]
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