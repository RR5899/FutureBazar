import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { rolepermission } from '@prisma/client';

@Injectable()
export class RolePermissionService {
    constructor(private readonly prisma: PrismaService) { }

    async getRolePermissionsByShopId(shopId: string): Promise<rolepermission[]> {
        return this.prisma.rolepermission.findMany({
            where: {
                role: {
                    shop: {
                        ShopId: shopId,
                    },
                },
            },
            include: {
                role: true,
                permission: true,
            },
        });
    }

    async getRolePermissionsByRoleId(roleId: string): Promise<rolepermission> {
        return this.prisma.rolepermission.findFirstOrThrow({
            where: {
                RoleId: roleId,
            },
            include: {
                role: true,
                permission: true,
            },
        });
    }

    async findRolePermissions(userRoles: string[]): Promise<rolepermission[]> {
        if (!userRoles || userRoles.length === 0) {
            return [];
        }

        // Fetch roles by IDs
        const roles = await this.prisma.role.findMany({
            where: {
                RoleId: {
                    in: userRoles,
                },
            },
        });

        // Extract role IDs from fetched roles
        const roleIds = roles.map(role => role?.RoleId);

        // Fetch role permissions by role IDs
        const rolePermissions: rolepermission[] = [];
        for (const roleId of roleIds) {
            const permissions = await this.getRolePermissionsByRoleId(roleId);
            if (permissions) rolePermissions.push(permissions);
        }

        return rolePermissions;
    }
}