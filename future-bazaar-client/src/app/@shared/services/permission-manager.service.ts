import { Injectable } from '@angular/core';
import { IPermission, Permission } from '../constants/permission.enum';

@Injectable({
  providedIn: 'root'
})
export class PermissionManagerService {
  permissions: IPermission;
  constructor() { }

  setPermissions(permissions: string[]) {
    this.permissions = {
      AddProducts: permissions.includes(Permission.AddProducts),
      EditProducts: permissions.includes(Permission.EditProducts),
      ManageInventory: permissions.includes(Permission.ManageInventory),
      RequestOrderCancellation: permissions.includes(Permission.RequestOrderCancellation),
      SetProductPrices: permissions.includes(Permission.SetProductPrices),
      TrackOrderStatus: permissions.includes(Permission.TrackOrderStatus),
      UpdateProfileInformation: permissions.includes(Permission.UpdateProfileInformation),
      ViewOrderHistory: permissions.includes(Permission.ViewOrderHistory),
      ViewProducts: permissions.includes(Permission.ViewProducts),
    };
  }
}
