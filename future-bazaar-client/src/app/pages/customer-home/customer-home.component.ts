import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductComponent } from 'src/app/@shared/components/search-product/search-product.component';
import { ICategory } from '../all-categories-page/services/all-categories.model';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { ProductCardComponent } from 'src/app/@shared/components/product-card/product-card.component';
import { CustomerHomeService } from './services/customer-home.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, SearchProductComponent, ProductCardComponent],
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent {
  categories: ICategory[];
  mostSearchedProducts: IProduct[];
  constructor(
    private router: Router,
    private _customerHomeService: CustomerHomeService
  ) {

  }

  ngOnInit() {
    this.getAllCategories();
    this.getMostSearchedProducts();
  }

  getMostSearchedProducts() {
    this._customerHomeService.getMostSearched(6)
    .subscribe(mostSearchedProducts => this.mostSearchedProducts = mostSearchedProducts);
  }

  goToAllCategories() {
    this.router.navigate(['all-categories']);
  }

  navigateToSubcategories(categoryId: string) {
    this.router.navigate(['/subcategories', categoryId]);
  }

  getAllCategories() {
    this._customerHomeService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  productClick(product: IProduct) {
    this.router.navigate(['product', product.Id]);
  }
}
