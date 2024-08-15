import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService) { }

  async getProductViews(productId: string): Promise<number> {
    const product = await this.prisma.product.findUnique({ where: { ProductId: productId }, select: { ProductViews: true } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product.ProductViews;
  }

  async getShopViews(shopId: string): Promise<number> {
    const shop = await this.prisma.shop.findUnique({ where: { ShopId: shopId }, select: { UserViews: true } });
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    return shop.UserViews;
  }

  async getViewsBySellerId(shopId: string): Promise<{ productViews: number, shopViews: number, totalViews: number }> {
    const products = await this.prisma.product.findMany({
      where: { ShopId: shopId },
      select: {
        ProductViews: true,
        shop: {
          select: { UserViews: true }
        }
      }
    });

    if (!products) {
      throw new NotFoundException('Shop not found');
    }

    const productViews = products.reduce((accumulator, currentValue) => accumulator + currentValue.ProductViews, 0) || 0;
    const shopViews = products.reduce((accumulator, currentValue) => accumulator + currentValue.shop.UserViews, 0) || 0;
    const totalViews = productViews + shopViews;
    return {
      productViews: productViews,
      shopViews: shopViews,
      totalViews: totalViews
    };
  }
}