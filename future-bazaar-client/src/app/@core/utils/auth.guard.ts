import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CommonRoutes } from '../router/route.constant';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate([CommonRoutes.Login]);
    return false;
  }
}
