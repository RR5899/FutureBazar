import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { IShopRequestDto } from './dto/shop-request.dto';
import { ShopRequestService } from './shop-request.service';
import { GetRequestsInputModel } from './get-requests.model';
import { shoprequest } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shop-request')
@Controller('shop-request')
export class ShopRequestController {

    constructor(private readonly shopRequestService: ShopRequestService) {

    }

    @Post()
    async create(@Body() shopRequest: IShopRequestDto): Promise<any> {
        try {
            await this.shopRequestService.createShopRequest(shopRequest);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('GetShopRequests')
    async getShopRequests(@Body() createShopRequestDto: GetRequestsInputModel): Promise<shoprequest[]> {
        try {
            return this.shopRequestService.getShopRequests(createShopRequestDto);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
