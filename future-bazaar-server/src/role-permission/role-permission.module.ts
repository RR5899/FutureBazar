import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    providers: [RolePermissionService, PrismaService],
    controllers: [RolePermissionController],
    exports: [RolePermissionService]
})
export class RolePermissionModule { }
