import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/@shared/components/product-card/product.model';
import { environment } from 'src/environments/environment';
import { ICategory } from '../../all-categories-page/services/all-categories.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomeService {

  constructor(private _http: HttpClient) { }

  getMostSearched(limit?: number) {
    const url = `${environment.apiUrl}/product/most-searched/${limit}`;
    return this._http.get<IProduct[]>(url).pipe(map(
      prod => {
        const latitude = parseInt(sessionStorage.getItem('latitude'));
        const longitude = parseInt(sessionStorage.getItem('longitude'));
        return prod.map(p => ({
          ...p,
          Distance: this.haversineDistance([latitude, longitude], [p.Shop.Address.Latitude, p.Shop.Address.Longitude])
        }))
      }
    ));
  }

  getAllCategories() {
    const url = `${environment.apiUrl}/categories`;
    return this._http.get<ICategory[]>(url);
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
