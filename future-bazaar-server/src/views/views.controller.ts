import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ViewsService } from 'src/views/views.service';

@ApiTags('views')
@Controller('views')
export class ViewsController {
    constructor(private readonly _viewsService: ViewsService) { }

    @Get('products/:productId')
    async getProductViews(@Query('productId') productId: string): Promise<number> {
        try {
            return this._viewsService.getProductViews(productId);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('shop/:sellerId')
    async getShopViews(@Query('shopId') shopId: string): Promise<number> {
        try {
            return this._viewsService.getShopViews(shopId);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get(':shopId/allViews')
    async getViewsBySellerId(@Query('shopId') shopId: string): Promise<{ productViews: number, shopViews: number }> {
        try {
            return this._viewsService.getViewsBySellerId(shopId);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
    