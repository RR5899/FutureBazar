import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from './services/product-detail.service';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteProductSheetComponent } from 'src/app/@core/component/delete-product-sheet/delete-product-sheet.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  productId: number | null = null;
  product: IProduct;
  searchProduct: string = ''
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000, // Move to next slide every 5 seconds
    items: 1, // Display only one image at a time
    dots: false,
    margin: 10,
    autoHeight: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  isSellerLoggedIn: boolean;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private bottomSheet: MatBottomSheet,
    private _productDetailService: ProductDetailService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        const productId = params.get('id');  
        this.getProductDetail(productId);
        console.log(sessionStorage.getItem('roleName'));
        
        this.isSellerLoggedIn = sessionStorage.getItem('roleName').toLocaleLowerCase().includes('seller');
      }
    });
  }

  getProductDetail(productId: string) {
    this._productDetailService.getProductById(productId).subscribe(product => {
      this.product = product;
    });
  }

  goBack() {
    this.location.back();
  }

  editProduct() {
    const queryParams = { productId: this.product.Id };
    this._router.navigate(['add-product'], { queryParams });
  }

  deleteProduct() {
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet?.open(DeleteProductSheetComponent, {
      data: { productId: this.product.Id }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      console.log('Bottom sheet dismissed with result:', result);
    });
  }
}
