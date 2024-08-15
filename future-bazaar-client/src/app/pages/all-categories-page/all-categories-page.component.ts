import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ICategory } from './services/all-categories.model';
import { AllCategoriesService } from './services/all-categories.service';
import { FormsModule } from '@angular/forms';
import { CategoryFilterPipe } from './pipe/category-filter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-categories-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFilterPipe],
  templateUrl: './all-categories-page.component.html',
  styleUrls: ['./all-categories-page.component.scss']
})
export class AllCategoriesPageComponent {
  categories: ICategory[] = [];
  filterText: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private _allCategoriesService: AllCategoriesService,
  ) {

  }

  ngOnInit(): void {
    this._allCategoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  navigateToSubcategories(categoryId: string) {
    this.router.navigate(['/subcategories', categoryId]);
  }

  goBack() {
    this.location.back();
  }
}
