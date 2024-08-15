import { Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SellerRoutes } from 'src/app/@core/router/route.constant';

@Injectable({
  providedIn: 'root'
})
export class AddProductApiService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  addProduct(product: FormData) {
    const url = `${environment.apiUrl}/product/Add`;
    this._http.post(url, product).subscribe(res => {
      this._router.navigate([SellerRoutes.Home]);
    });
  }

  updateProduct( productId: string, product: FormData) {
    const url = `${environment.apiUrl}/product/${productId}/update`;
    this._http.post(url, product).subscribe(res => {
      this._router.navigate([SellerRoutes.Home]);
    });
  }
}
