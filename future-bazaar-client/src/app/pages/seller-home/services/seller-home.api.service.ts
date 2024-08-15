import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { ICategory } from '../../all-categories-page/services/all-categories.model';

@Injectable({
  providedIn: 'root'
})
export class SellerHomeApiService {

  constructor(private _http: HttpClient) { }

  getHomePageViews() {
    const shopId = sessionStorage.getItem('shopId');
    const url = `${environment.apiUrl}/views/${shopId}/allViews?shopId=${shopId}`;
    return this._http.get<{ productViews: number, shopViews: number, totalViews: number }>(url);
  }

  getMostViewedProducts(limit = 5): Observable<IProduct[]> {
    let latitude: number;
    let longitude: number;
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    
    const shopId = sessionStorage.getItem('shopId');
    const url = `${environment.apiUrl}/product/most-viewed-products?shopId=${shopId}&productCount=${limit}`;
    return this._http.get<IProduct[]>(url).pipe(map(
      prod => {
        return prod.map(p => ({
          ...p,
          Distance: this.haversineDistance([latitude, longitude], [p.Shop.Address.Latitude, p.Shop.Address.Longitude])
        }))
      }
    ))  
  }

  private haversineDistance(coord1: [number, number], coord2: [number, number]): string {
    const R = 6371; // radius of the Earth in kilometers
    const phi1 = this.toRadians(coord1[0]);
    const phi2 = this.toRadians(coord2[0]);
    const deltaPhi = this.toRadians(coord2[0] - coord1[0]);
    const deltaLambda = this.toRadians(coord2[1] - coord1[1]);

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getAllSubCategories(categoryIds: string[]) {
    const url = `${environment.apiUrl}/categories/subcategories`;
    return this._http.post<ICategory[]>(url, categoryIds);
  }

  getAllCategories() {
    const url = `${environment.apiUrl}/categories`;
    return this._http.get<ICategory[]>(url);
  }
}
