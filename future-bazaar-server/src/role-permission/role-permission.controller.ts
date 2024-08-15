import { Controller, Get, Query } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role-permission')
@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionsService: RolePermissionService) { }

    @Get('shop/:shopId')
    async getRolePermissionsByShopId(@Query('shopId') shopId: string) {
        return this.rolePermissionsService.getRolePermissionsByShopId(shopId);
    }
}
