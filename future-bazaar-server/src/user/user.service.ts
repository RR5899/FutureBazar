import { BadRequestException, Injectable } from '@nestjs/common';
import { ICreateUserInputModel } from './user.model';
import { v4 as uniqueId } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly _roleService: RoleService) { }

    async createUser(createUserDto: ICreateUserInputModel, isSellerSignUp: boolean = false): Promise<string> {
        try {
            const roleId = isSellerSignUp ? (await this._roleService.getGlobalRoles('Test Seller'))[0].RoleId : (await this._roleService.getGlobalRoles('Customer'))[0].RoleId;
            const newUser: user = {
                UserId: uniqueId(),
                Email: createUserDto.email,
                FirstName: createUserDto.firstName,
                LastName: createUserDto.lastName,
                CreatedBy: null,
                CreatedOn: new Date(),
                UpdatedOn: new Date(),
                UpdatedBy: null
            };
            const addedUser = await this.prisma.user.create({ data: newUser });
            await this.prisma.userrole.create({
                data: {
                    UserRoleID: uniqueId(),
                    UserId: addedUser.UserId,
                    RoleId: roleId,
                    ShopId: null,
                }
            });
            return addedUser.UserId;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}