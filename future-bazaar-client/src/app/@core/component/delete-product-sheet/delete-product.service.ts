import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {

  constructor(private _http: HttpClient) { }

  deleteProduct(productId: string) {
    const url = `${environment.apiUrl}/product/${productId}/delete-product`;
    return this._http.delete(url);
  }
}
