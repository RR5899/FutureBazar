import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IProductDetailOutputModel } from './dto/product-detail.model';
import { AddProductDto } from './dto/AddProduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { product } from '@prisma/client';
import * as admin from 'firebase-admin';
import { Product } from './dto/product-by-category.model';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) { }

  async addProduct(addProduct: AddProductDto, photos: Array<Express.Multer.File>) {
    const newProduct = this.mapToDbAddProduct(addProduct);
    const product = await this.prisma.product.create({ data: newProduct });

    const photoUrls = await Promise.all(photos.map((photo) => this.uploadPhoto(photo, newProduct.ProductId)));

    await this.prisma.productphotos.createMany({
      data: photoUrls.map((url) => ({
        ProductPhotoId: uuidv4(),
        ProductId: newProduct.ProductId,
        PhotoUrl: url,
      })),
    });

    return product;
  }

  async uploadPhoto(file: Express.Multer.File, productId: string): Promise<string> {
    const fileRef = admin.storage().bucket().file(`photos/${file.originalname}_${productId}`);
    await fileRef.save(file.buffer)
    await fileRef.makePublic();
    return fileRef.publicUrl();
  }

  private mapToDbAddProduct(addProduct: AddProductDto): product {
    const newProduct: product = {
      ProductId: uuidv4(),
      Name: addProduct.name,
      Description: addProduct.description,
      OriginalPrice: parseInt(addProduct.originalPrice),
      DiscountedPrice: parseInt(addProduct.discountedPrice),
      CategoryId: addProduct.categoryId,
      SubCategoryId: addProduct.subcategoryId,
      Stocks: parseInt(addProduct.stock),
      Status: addProduct.status,
      ShopId: addProduct.shopId,
      CreatedOn: new Date(),
      UpdatedOn: new Date(),
      ProductViews: 0,
      CreatedBy: addProduct.createdBy || null,
      UpdatedBy: addProduct.createdBy || null
    };
    return newProduct;
  }

  async getMostViewedProducts(shopId: string, limit: number): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { ShopId: shopId },
      orderBy: { ProductViews: 'desc' },
      take: limit,
      include: {
        shop: {
          include: {
            shopaddress: {
              select: {
                StreetAddress: true,
                City: true,
                State: true,
                PostalCode: true,
                Country: true,
                Latitude: true,
                Longitude: true,
              },
            },
          }
        },
        productphotos: {
          select: {
            ProductId: true,
            PhotoUrl: true,
          },
        },
      }
    });

    const prods: Product[] = products.map(product => ({
      Name: product.Name,
      Id: product.ProductId,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      Shop: product.shop ? { ShopId: product.shop.ShopId, Name: product.shop.ShopName, Address: product.shop.shopaddress[0] } : null,
      Photos: product.productphotos.filter(p => p.ProductId === product.ProductId).map(photo => photo.PhotoUrl),
    }));

    return prods;
  }

  async getProductByCategory(categoryId: string, search: string) {
    const products = await this.prisma.product.findMany({
      where: { CategoryId: categoryId, Name: search },
      include: {
        shop: {
          include: {
            shopaddress: {
              select: {
                StreetAddress: true,
                City: true,
                State: true,
                PostalCode: true,
                Country: true,
                Latitude: true,
                Longitude: true,
              },
            },
          }
        },
        productphotos: {
          select: {
            ProductId: true,
            PhotoUrl: true,
          },
        },
      }
    });

    const prods: Product[] = products.map(product => ({
      Name: product.Name,
      Id: product.ProductId,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      Shop: product.shop ? { ShopId: product.shop.ShopId, Name: product.shop.ShopName, Address: product.shop.shopaddress[0] } : null,
      Photos: product.productphotos.filter(p => p.ProductId === product.ProductId).map(photo => photo.PhotoUrl),
    }));

    return prods;
  }

  async getProductByShop(shopId: string, search: string) {
    let products;
    if (shopId != 'undefined') {
      products = await this.prisma.product.findMany({
        where: { ShopId: shopId, Name: search },
        include: {
          shop: {
            include: {
              shopaddress: {
                select: {
                  StreetAddress: true,
                  City: true,
                  State: true,
                  PostalCode: true,
                  Country: true,
                  Latitude: true,
                  Longitude: true,
                },
              },
            },
          },
          productphotos: {
            select: {
              ProductId: true,
              PhotoUrl: true,
            },
          },
          category: {
            select: {
              CategoryId: true,
              CategoryName: true,
            },
          },
        },
      });
    }
    else {
      products = await this.prisma.product.findMany({
        where: { Name: search },
        include: {
          shop: {
            include: {
              shopaddress: {
                select: {
                  StreetAddress: true,
                  City: true,
                  State: true,
                  PostalCode: true,
                  Country: true,
                  Latitude: true,
                  Longitude: true,
                },
              },
            },
          },
          productphotos: {
            select: {
              ProductId: true,
              PhotoUrl: true,
            },
          },
          category: {
            select: {
              CategoryId: true,
              CategoryName: true,
            },
          },
        },
      });
    }

    const prods: Product[] = products.map(product => ({
      Name: product.Name,
      Id: product.ProductId,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      CategoryId: product.CategoryId,
      CategoryName: product.category.CategoryName,
      Shop: product.shop ? { ShopId: product.shop.ShopId, Name: product.shop.ShopName, Address: product.shop.shopaddress[0] } : null,
      Photos: product.productphotos.filter(p => p.ProductId === product.ProductId).map(photo => photo.PhotoUrl),
    }));

    return prods;
  }

  async getProductById(productId: string) {
    const product = await this.prisma.product.findFirstOrThrow({
      where: { ProductId: productId },
      include: {
        shop: {
          include: {
            shopaddress: {
              select: {
                StreetAddress: true,
                City: true,
                State: true,
                PostalCode: true,
                Country: true,
                Latitude: true,
                Longitude: true,
              },
            },
          }
        },
        productphotos: {
          select: {
            ProductId: true,
            PhotoUrl: true,
          },
        },
      }
    });

    const prod: Product = {
      Name: product.Name,
      Id: product.ProductId,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      CategoryId: product.CategoryId,
      Stocks: product.Stocks,
      Description: product.Description,
      Shop: product.shop ? { ShopId: product.shop.ShopId, Name: product.shop.ShopName, Address: product.shop.shopaddress[0] } : null,
      Photos: product.productphotos.filter(p => p.ProductId === product.ProductId).map(photo => photo.PhotoUrl),
    };

    return prod;
  }

  async getMostSearchedProducts(limit: number): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { ProductViews: 'desc' },
      take: limit,
      include: {
        shop: {
          include: {
            shopaddress: {
              select: {
                StreetAddress: true,
                City: true,
                State: true,
                PostalCode: true,
                Country: true,
                Latitude: true,
                Longitude: true,
              },
            },
          }
        },
        productphotos: {
          select: {
            ProductId: true,
            PhotoUrl: true,
          },
        },
      }
    });

    const prods: Product[] = products.map(product => ({
      Name: product.Name,
      Id: product.ProductId,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      Shop: product.shop ? { ShopId: product.shop.ShopId, Name: product.shop.ShopName, Address: product.shop.shopaddress[0] } : null,
      Photos: product.productphotos.filter(p => p.ProductId === product.ProductId).map(photo => photo.PhotoUrl),
    }));

    return prods;
  }

  deleteProduct(productId: string) {
    return this.prisma.product.delete({ where: { ProductId: productId } });
  }

  async updateProduct(productId: string, updateProductDto: AddProductDto, photos: Array<Express.Multer.File>): Promise<boolean> {
    const newProduct = this.mapToDbAddProduct(updateProductDto);
    await this.prisma.product.update({ where: { ProductId: productId }, data: newProduct });

    const photoUrls = await Promise.all(photos.map((photo) => this.uploadPhoto(photo, newProduct.ProductId)));

    await this.prisma.productphotos.createMany({
      data: photoUrls.map((url) => ({
        ProductPhotoId: uuidv4(),
        ProductId: newProduct.ProductId,
        PhotoUrl: url,
      })),
    });

    return true;
  }
}
