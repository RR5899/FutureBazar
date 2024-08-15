import { Module } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { RolePermissionService } from 'src/role-permission/role-permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [],
  controllers: [UserInfoController],
  providers: [UserInfoService, RolePermissionService, PrismaService]
})
export class UserInfoModule {}
