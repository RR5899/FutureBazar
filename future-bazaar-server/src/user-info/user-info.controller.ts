import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { IUserInfoOutputModel } from './user-info.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-info')
@Controller('user-info')
export class UserInfoController {

    constructor(private _userInfoService: UserInfoService) {

    }

    @Get('get-member-info')
    getMemberInfo(@Query('emailId') emailId: string): Promise<IUserInfoOutputModel> {
        try {          
            return this._userInfoService.getUserDetailsByEmail(emailId);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
