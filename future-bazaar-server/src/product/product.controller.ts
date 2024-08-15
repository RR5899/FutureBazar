import { BadRequestException, Body, Controller, Get, Query, Post, UseInterceptors, UploadedFiles, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dto/AddProduct.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(private _productService: ProductService) {

    }

    @Post('Add')
    @UseInterceptors(FilesInterceptor('photos'))
    add(@UploadedFiles() photos: Array<Express.Multer.File>, @Body() addProductInput: AddProductDto) {
        try {                 
            return this._productService.addProduct(addProductInput, photos);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Put(':productId/update')
    @UseInterceptors(FilesInterceptor('photos'))
    update(@Param('productId') productId: string, @UploadedFiles() photos: Array<Express.Multer.File>, @Body() updateProductInput: AddProductDto) {
        try {                 
            return this._productService.updateProduct(productId, updateProductInput, photos);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('Views')
    views() {
        try {
            return null;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('most-viewed-products')
    getMostViewedProducts(@Query('shopId') shopId: string, @Query('productCount') productCount: string) {
        try {
            return this._productService.getMostViewedProducts(shopId, parseInt(productCount));
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get(':categoryId/category/product')
    getProductsByCategory(@Param('categoryId') categoryId: string, @Query('search') search: string) {
        return this._productService.getProductByCategory(categoryId, search);
    }

    @Get(':shopId/shop/product')
    getProductsByShop(@Param('shopId') shopId: string, @Query('search') search: string) {
        return this._productService.getProductByShop(shopId, search);
    }

    @Get(':productId')
    getProductsById(@Param('productId') productId: string) {
        return this._productService.getProductById(productId);
    }

    @Get('most-searched/:limit')
    mostSearched(@Param('limit') limit: string) {
        if (limit == undefined) {
            limit = null;
        }
        return this._productService.getMostSearchedProducts(parseInt(limit));
    }

    @Delete(':productId/delete-product')
    deleteProduct(@Param('productId') productId: string) {
        return this._productService.deleteProduct(productId);
    }
}
