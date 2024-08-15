import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) { }

    async createRole(createRoleDto: CreateRoleDto): Promise<role> {
        const { name, description } = createRoleDto;
        const role: role = await this.prisma.role.create({
            data: {
                RoleId: uuidV4(),
                RoleName: name,
                Description: description,
                CreatedOn: new Date(),
                UpdatedOn: new Date(),
            },
        });
        return role;
    }

    async getRoles(shopId: string): Promise<role[]> {
        return this.prisma.role.findMany({ where: { ShopId: shopId } });
    }

    async getGlobalRoles(roleName: string = null): Promise<role[]> {
        if (roleName) {
            return this.prisma.role.findMany({ where: { ShopId: null, RoleName: roleName } });
        }
        return this.prisma.role.findMany({ where: { ShopId: null } });
    }

    async getRoleById(roleId: string): Promise<role> {
        const role = await this.prisma.role.findUnique({ where: { RoleId: roleId } });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async findRolesByIds(roleIds: string[]): Promise<role[]> {
        const roles = await this.prisma.role.findMany({
            where: { RoleId: { in: roleIds } },
        });
        if (!roles || roles.length === 0) {
            throw new NotFoundException('Roles not found');
        }
        return roles;
    }

    async updateRole(roleId: string, updateRoleDto: UpdateRoleDto): Promise<role> {
        const { name, description } = updateRoleDto;
        return this.prisma.role.update({
            where: { RoleId: roleId },
            data: { RoleName: name, Description: description },
        });
    }

    async deleteRole(roleId: string): Promise<void> {
        await this.prisma.role.delete({ where: { RoleId: roleId } });
    }
}