import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserDetail, IUserInfoOutputModel } from './user-info.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionDTO } from 'src/role-permission/dto/permission.dto';
import { RolePermissionDTO } from 'src/role-permission/dto/role-permission.dto';

@Injectable()
export class UserInfoService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserDetailsByEmail(email: string): Promise<IUserInfoOutputModel> {
        // Fetch user details by user id
        const user = await this.prisma.user.findUnique({
            where: { Email: email },
            include: {
                userrole: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Fetch shop details by ShopId associated with the user
        const shop = user?.userrole?.length != 0 && user?.userrole[0]?.ShopId ? await this.prisma.shop.findUnique({
            where: { ShopId: user?.userrole[0]?.ShopId },
        }) : null;

        // Fetch role permissions associated with the user's roles
        const roleIds = user?.userrole?.map(role => role?.role?.RoleId);
        const rolePermissions: RolePermissionDTO[] = [];
        for (const roleId of roleIds) {
            const permissions = await this.prisma.rolepermission.findMany({
                where: {
                    role: {
                        RoleId: roleId,
                    },
                },
                include: {
                    permission: true,
                    role: true
                },
            });
            const permission: PermissionDTO[] = permissions.map(z => ({ permissionId: z.PermissionId, permissionName: z.permission.PermissionName }));
            rolePermissions.push({ roleId: roleId, roleName: permissions[0]?.role?.RoleName, permissions: permission });
        }

        const mappedUser: IUserDetail = {
            firstName: user.FirstName,
            lastName: user.LastName,
            email: user.Email,
        };
        return {
            userDetails: mappedUser,
            shopDetails: {
                shopId: shop?.ShopId,
                shopName: shop?.ShopName,
            },
            rolePermissions,
        };
    }
}
