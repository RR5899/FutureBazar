import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ISubcategory } from './services/subcategory.model';
import { SubcategoryService } from './services/subcategory.service';
import { FormsModule } from '@angular/forms';
import { CategoryFilterPipe } from '../all-categories-page/pipe/category-filter.pipe';

@Component({
  selector: 'app-subcategory-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFilterPipe],
  templateUrl: './subcategory-gallery.component.html',
  styleUrls: ['./subcategory-gallery.component.scss']
})
export class SubcategoryGalleryComponent implements OnInit {
  subcategories: ISubcategory[] = [];
  categoryId: string | null = null;
  filterText: string = '';
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.loadSubcategories(this.categoryId);
      }
    });
  }

  loadSubcategories(categoryId: string) {
    this.subcategoryService.getSubCategoriesById(categoryId).subscribe(
      (data) => {
        this.subcategories = data;
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}