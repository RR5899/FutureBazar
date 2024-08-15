import { PermissionDTO } from './permission.dto';

export class RolePermissionDTO {
  roleId: string;
  roleName: string;
  permissions: PermissionDTO[];
}