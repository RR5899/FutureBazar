import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddProduct } from './product.interface';
import { AddProductService } from './add-product.service';
import { SellerHomeApiService } from '../seller-home/services/seller-home.api.service';
import { ICategory } from '../all-categories-page/services/all-categories.model';
import { ISubcategory } from '../subcategory-gallery/services/subcategory.model';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../product-detail/services/product-detail.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule, CarouselModule],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
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
  productForm: FormGroup;
  categories: ICategory[];
  private subcategories: ISubcategory[];
  subcategoriesByCategory: ISubcategory[];
  currentProductId: string;
  constructor(
    private fb: FormBuilder, 
    private _activatedRoute: ActivatedRoute,
    private _addProductService: AddProductService,
    private _productDetailService: ProductDetailService,
    private _sellerHomeApiService: SellerHomeApiService,
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      photos: [''],
      originalPrice: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      discountedPrice: [null, [Validators.required, Validators.min(0)]],
      stocks: [null, [Validators.required, Validators.min(0)]],
      description: [''],
    });
    this._sellerHomeApiService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.getAllSubCategories(categories.map(z => z.id));
      this.productForm = this.fb.group({
        productName: ['', [Validators.required]],
        photos: [''],
        originalPrice: ['', [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        subcategory: ['', Validators.required],
        discountedPrice: [null, [Validators.required, Validators.min(0)]],
        stocks: [null, [Validators.required, Validators.min(0)]],
        description: [''],
      });
    });   
  }

  getAllSubCategories(categoryIds: string[]) {
    this._sellerHomeApiService.getAllSubCategories(categoryIds).subscribe(sub => {
      this.subcategories = sub;
      this.getProductDetail();
    });
  }

  getProductDetail() {
    this._activatedRoute.queryParams.subscribe(res => {
      console.log(res);
      if(res?.['productId']) {
        this.getProductDetailFromApi(res?.['productId']);
      }
    })
  }

  getProductDetailFromApi(productId: string) {
    this._productDetailService.getProductById(productId).subscribe(product => {
      this.subcategoriesByCategory = this.subcategories.filter(z => z.parentCategoryId == product.CategoryId);
      this.selectedImages = product.Photos.map(url => url);
      this.currentProductId = product.Id;
      this.productForm = this.fb.group({
        productName: [product.Name, [Validators.required]],
        photos: [''],
        originalPrice: [product.OriginalPrice, [Validators.required, Validators.min(0)]],
        category: [product.CategoryId, Validators.required],
        subcategory: [product.SubcategoryId, Validators.required],
        discountedPrice: [product.DiscountedPrice, [Validators.required, Validators.min(0)]],
        stocks: [product.Stock, [Validators.required, Validators.min(0)]],
        description: [product.Description],
      });
    });
  }

  categoryChange(event) {
    const id: string = event.target.value;
    this.subcategoriesByCategory = this.subcategories.filter(z => z.parentCategoryId == id);
    this.productForm.patchValue( { subcategory: null } );
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const product: IAddProduct = this.productForm.value;
    if (this.currentProductId) {
      this._addProductService.updateProduct(this.currentProductId, product);
    }
    else {
      this._addProductService.addProduct(product);
    }
  }

  onImageSelect(event: any) {
    const files = event.target.files;
    this.onFileSelected(event);
    this.productForm.patchValue( { photos: files });
  }
  selectedImages: string[];
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedImages = []; // Reset the images array

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result); // Add the image to the array
      };
      reader.readAsDataURL(files[i]); // Convert the file to base64 string
    }
  }
}
