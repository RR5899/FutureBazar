import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserInputModel } from './user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup-as-seller')
    async signUpAsSeller(@Body() createUserDto: ICreateUserInputModel): Promise<string> {
        try {
            const userId = await this.userService.createUser(createUserDto);
            return userId;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('create')
    async create(@Body() createUserDto: ICreateUserInputModel): Promise<string> {
        try {
            const userId = await this.userService.createUser(createUserDto);
            return userId;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
