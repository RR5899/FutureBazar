import { CommonModule, Location } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { FilterByNamePipe } from 'src/app/@shared/pipes/filter-by-name.pipe';
import { ProductCardComponent } from 'src/app/@shared/components/product-card/product-card.component';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterByNamePipe, ProductCardComponent],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: IProduct[] = [];
  categoryId: string;
  search: string;
  constructor(
    private _router: Router,
    private location: Location,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _productService: ProductService, 
  ) {

  }
  ngOnInit() {
    this._authService.userSub.subscribe(res => {
      this.getProds();
    });    
  }

  getProds() {
    this._route.queryParams.subscribe(params => {
      const categoryId = params?.['categoryId'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
        return;
      }
      if (params?.['search']) {
        this.search = params?.['search'];
        this.getProductsByShop(params?.['search']);
      }
      else {
        this.getProductsByShop();
      }
    });
  }
  getProductsByCategory(categoryId: string) {
    this._productService.getProductsByCategory(categoryId).subscribe(products => this.products = products);
  }

  getProductsByShop(name?: string) {
    this._productService.getProductsByShop(name).subscribe(products => this.products = products);
  }

  searchProduct() {
    const timer = setTimeout(() => {
      
    }, 800);
  }

  productClick(product: IProduct) {
    this._router.navigate(['product', product.Id]);   
  }

  goBack() {
    this.location.back();
  }
}
