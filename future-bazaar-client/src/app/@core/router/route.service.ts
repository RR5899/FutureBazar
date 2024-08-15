import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SellerRoutes } from './route.constant';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private _router: Router) { }

  permissions: string[];

  initialRoute(roleName: string) {
    if (roleName.toLowerCase() === 'customer') {
      this._router.navigate(['customer-home']);
    }
    if (roleName.toLowerCase() === 'test seller') {
      if (window.location.href.split('/')?.length === 0 || window.location.href.includes('login')) {
        this._router.navigate([SellerRoutes.Home]);
      }
    }
  }
}
