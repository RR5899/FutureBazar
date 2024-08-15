import { Injectable } from '@angular/core';
import { IAddProduct } from './product.interface';
import { IAddProductInput } from './add-product.model';
import { AddProductApiService } from './add-product.api.service';
import { PermissionManagerService } from 'src/app/@shared/services/permission-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(
    private _permissionService: PermissionManagerService,
    private _addProductApiService: AddProductApiService,
  ) { }

  addProduct(product: IAddProduct) {
    const formData = new FormData();
    for (let i = 0; i < product.photos.length; i++) {
      formData.append('photos', product.photos[i]);
    }

    formData.append('name', product.productName);
    formData.append('description', product.description);
    formData.append('stock', product.stocks.toString());
    formData.append('categoryId', product.category);
    formData.append('subcategoryId', product.subCategory);
    formData.append('originalPrice', product.originalPrice.toString());
    formData.append('discountedPrice', product.discountedPrice.toString());
    formData.append('shopId', sessionStorage.getItem('shopId'));
    this._addProductApiService.addProduct(formData);
  }

  updateProduct(productId: string, product: IAddProduct) {
    const formData = new FormData();
    for (let i = 0; i < product.photos.length; i++) {
      formData.append('photos', product.photos[i]);
    }

    formData.append('name', product.productName);
    formData.append('description', product.description);
    formData.append('stock', product.stocks.toString());
    formData.append('categoryId', product.category);
    formData.append('subcategoryId', product.subCategory);
    formData.append('originalPrice', product.originalPrice.toString());
    formData.append('discountedPrice', product.discountedPrice.toString());
    formData.append('shopId', sessionStorage.getItem('shopId'));
    this._addProductApiService.updateProduct(productId, formData);
  }
}
