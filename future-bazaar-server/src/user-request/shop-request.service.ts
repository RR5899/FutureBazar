import { Injectable } from '@nestjs/common';
import { IShopRequestDto } from './dto/shop-request.dto';
import { v4 as uniqueId } from 'uuid';
import { GetRequestsInputModel } from './get-requests.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { shoprequest } from '@prisma/client';

@Injectable()
export class ShopRequestService {
    constructor(private readonly prisma: PrismaService) { }

    async createShopRequest(shopRequestDto: IShopRequestDto): Promise<shoprequest> {
        const input: shoprequest = this.mapDtoToEntity(shopRequestDto);
        return await this.prisma.shoprequest.create({ data: input });
    }

    async getShopRequests(input: GetRequestsInputModel): Promise<shoprequest[]> {
        const { shopName } = input;
        const shopRequests = await this.prisma.shoprequest.findMany({
            where: {
                ShopName: shopName,
            },
            skip: (input.page - 1) * input.limit,
            take: input.limit,
        });
        return shopRequests;
    }

    private mapDtoToEntity(dto: IShopRequestDto): shoprequest {
        const entity: shoprequest = {
            ShopRequestId: uniqueId(),
            ShopName: dto.shopName,
            UserId: dto.userId,
            CategoryId: dto.categoryId,
            PhoneNumber: dto.phoneNumber,
            StreetAddress: dto.streetAddress,
            City: dto.city,
            State: dto.state,
            PostalCode: dto.postalCode,
            Status: 'Pending',
        } as shoprequest;
        return entity;
    }
}