// category-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../services/all-categories.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categories: ICategory[], filterText: string): ICategory[] {
    if (!categories || !filterText) {
      return categories;
    }
    
    filterText = filterText.toLowerCase();
    return categories.filter(category => 
      category.name.toLowerCase().includes(filterText)
    );
  }
}