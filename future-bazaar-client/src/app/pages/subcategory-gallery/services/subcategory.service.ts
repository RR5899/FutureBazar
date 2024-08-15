import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISubcategory } from './subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private _http: HttpClient) { }

  getSubCategoriesById(categoryId: string) {
    const url = `${environment.apiUrl}/categories/${categoryId}/subcategory`;
    return this._http.get<ISubcategory[]>(url);
  }
}
