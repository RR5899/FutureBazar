import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id/subcategory')
  getSubCategories(@Param('id') id: string) {
    return this.categoriesService.getSubCategories(id);
  }

  @Post('subcategories')
  getAllSubCategories(@Body() categoryIds: string[]) {
    return this.categoriesService.getAllSubCategories(categoryIds);
  }
}
