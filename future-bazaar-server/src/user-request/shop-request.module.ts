import { Module } from '@nestjs/common';
import { ShopRequestController } from './shop-request.controller';
import { ShopRequestService } from './shop-request.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ShopRequestController],
  providers: [ShopRequestService, PrismaService]
})
export class ShopRequestModule {}
