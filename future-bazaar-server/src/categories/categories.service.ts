import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICategory } from './dto/category-output.model';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService) { }

  async getAllCategories(): Promise<ICategory[]> {
    return (await this.prisma.category.findMany({
      where: {
        ParentCategoryId: null,
        Level: 0
      }
    })).map(category => ({
      name: category.CategoryName,
      id: category.CategoryId,
      photoUrl: category.PhotoUrl
    }));
  }

  async getSubCategories(categoryId: string): Promise<ICategory[]> {
    return (await this.prisma.category.findMany({
      where: { ParentCategoryId: categoryId },
    })).map(category => {
      return {
        name: category.CategoryName,
        id: category.CategoryId,
        photoUrl: category.PhotoUrl
      }
    });
  }

  async getAllSubCategories(categoryIds: string[]): Promise<ICategory[]> {
    return (await this.prisma.category.findMany({
      where: {
        ParentCategoryId: {
          in: categoryIds, // Use 'in' to match any of the provided category IDs
        },
      },
    })).map(category => {
      return {
        name: category.CategoryName,
        id: category.CategoryId,
        photoUrl: category.PhotoUrl,
        parentCategoryId: category.ParentCategoryId
      };
    });
  }
}
