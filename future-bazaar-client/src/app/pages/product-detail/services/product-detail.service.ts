import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) { }

  getProductById(productId: string) {
    const url = `${environment.apiUrl}/product/${productId}`;
    return this.http.get<IProduct>(url).pipe(map(
      prod => {
        const latitude = parseInt(sessionStorage.getItem('latitude'));
        const longitude = parseInt(sessionStorage.getItem('longitude'));
        return {
          ...prod,
          Distance: latitude && latitude ? this.haversineDistance(
            [latitude, longitude], 
            [prod.Shop.Address.Latitude, prod.Shop.Address.Longitude]) 
          : null
        };
      }
    ));
  }

  private haversineDistance(coord1: [number, number], coord2: [number, number]): string {
    const R = 6371;
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
}
