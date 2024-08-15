import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { PRODUCTS } from '../../../@shared/constants/product.constant';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  getProductsByShop(name?: string) {
    let latitude: number;
    let longitude: number;
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    
    const shopId: string = sessionStorage.getItem('shopId');
    const url = 
    name ?
    `${environment.apiUrl}/product/${shopId}/shop/product?search=${name}` :
    `${environment.apiUrl}/product/${shopId}/shop/product`;
    return this._http.get<IProduct[]>(url).pipe(map(
      prod => {
        return prod.map(p => ({
          ...p,
          Distance: this.haversineDistance([latitude, longitude], [p.Shop.Address.Latitude, p.Shop.Address.Longitude])
        }))
      }
    ));
  }

  haversineDistance(coord1: [number, number], coord2: [number, number]): string {
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
    console.log(distance.toFixed(2));    
    return distance.toFixed(2);
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getProductsByCategory(categoryId: string) {
    let latitude: number;
    let longitude: number;
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    

    const url = `${environment.apiUrl}/product/${categoryId}/category/product`;
    return this._http.get<IProduct[]>(url).pipe(map(
      prod => {
        return prod.map(p => ({
          ...p,
          Distance: this.haversineDistance([latitude, longitude], [p.Shop.Address.Latitude, p.Shop.Address.Longitude])
        }))
      }
    ));
  }
}
