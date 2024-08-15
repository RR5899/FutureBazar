import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from './all-categories.model';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  constructor(private _http: HttpClient) { }

  getAllCategories() {
    const url = `${environment.apiUrl}/categories`;
    return this._http.get<ICategory[]>(url);
  }
}
