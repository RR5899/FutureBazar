import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Query, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor(private readonly _roleService: RoleService) { }

    @Post()
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<role> {
        try {
            return this._roleService.createRole(createRoleDto);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('global')
    async getGlobalRoles(): Promise<role[]> {
        try {
            return this._roleService.getGlobalRoles();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get(':shopId/shop')
    async getShopRoles(@Query('shopId') shopId: string): Promise<role[]> {
        try {
            return this._roleService.getRoles(shopId);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get(':id')
    async getRoleById(@Query('id') id: string): Promise<role> {
        const role = await this._roleService.getRoleById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    @Put(':id')
    async updateRole(@Query('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<role> {
        return this._roleService.updateRole(id, updateRoleDto);
    }

    @Delete(':id')
    async deleteRole(@Query('id') id: string): Promise<void> {
        await this._roleService.deleteRole(id);
    }
}
