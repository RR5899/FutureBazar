import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SellerHomeApiService } from './services/seller-home.api.service';
import { ProductCardComponent } from 'src/app/@shared/components/product-card/product-card.component';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { ICategory } from '../all-categories-page/services/all-categories.model';
import { SearchProductComponent } from 'src/app/@shared/components/search-product/search-product.component';

@Component({
  selector: 'seller-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, FormsModule, ProductCardComponent, SearchProductComponent],
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  duration: string = '';
  durations: string[] = ['1 Day', '1 Week', '1 Month'];
  storeViews: Signal<number> = signal(0);
  productViews: Signal<number> = signal(0);
  inquiries: Signal<number> = signal(0);
  totalViews: Signal<number> = signal(0);
  products: IProduct[] = [];;
  overviewDetail = [
    { count: this.storeViews(), label: 'Store Views', id: 'storeViews' },
    { count: this.productViews(), label: 'Product Views', id: 'productViews' },
    { count: this.inquiries(), label: 'Inquiries', id: 'inquiries' },
    { count: this.totalViews(), label: 'Total Views', id: 'totalViews' }
  ];
  categories: ICategory[];
  constructor(
    private router: Router,
    private sellerHomeApiService: SellerHomeApiService
  ) {

  }
  ngOnInit() {
    this.setViews();
    this.setProducts();
    this.getAllCategories();
  }

  setViews() {
    this.sellerHomeApiService.getHomePageViews().subscribe(
      response => {
        this.storeViews = signal(response.shopViews);
        this.productViews = signal(response.productViews);
        this.inquiries = signal(0);
        this.totalViews = signal(response.totalViews);
      }
    )
  }

  setProducts() {
    this.sellerHomeApiService.getMostViewedProducts().subscribe(
      response => {
        this.products = response;
      }
    )
  }

  durationSelection(event) {
  }

  goToAllCategories() {
    this.router.navigate(['all-categories']);
  }

  goToAllProducts() {
    this.router.navigate(['products']);
  }

  navigateToSubcategories(categoryId: string) {
    this.router.navigate(['/subcategories', categoryId]);
  }

  getAllCategories() {
    this.sellerHomeApiService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  productClick(product: IProduct) {
    this.router.navigate(['product', product.Id]);
  }
}
