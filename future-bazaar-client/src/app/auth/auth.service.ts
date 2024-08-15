import { Injectable, signal } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { RouteService } from '../@core/router/route.service';
import { Router } from '@angular/router';
import { CommonRoutes } from '../@core/router/route.constant';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreateUserInputModel } from '../@shared/interfaces/api-models/login.model';
import { IUserInfoOutputModel } from '../@shared/interfaces/api-models/user-info.model';
import { PermissionManagerService } from '../@shared/services/permission-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  currentUserSignal = signal<UserCredential>(null);
  userSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _firebaseAuth: Auth,
    private _routeService: RouteService,
    private _permissionManagerService: PermissionManagerService,
  ) {  }

  register(email: string, password: string): Observable<UserCredential>  {
    const registerPromise = createUserWithEmailAndPassword(this._firebaseAuth, email, password);
    return from(registerPromise);
  }

  login(email: string, password: string): void {
    const loginPromise = signInWithEmailAndPassword(this._firebaseAuth, email, password).then((res) => { return res; });
    from(loginPromise).subscribe(userCred => {
      this.setUser(userCred);
      this.getUserInfo(userCred.user.email);
    });
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    from(signInWithPopup(getAuth(), provider)).subscribe(userCred => this.setUser(userCred));
  }

  logout() {
    from(this._firebaseAuth.signOut()).subscribe(() => this.resetUser());
  }

  private resetUser() {
    sessionStorage.clear();
    this.currentUserSignal.set(null);
    this.isLoggedIn = false;
    this.userSub.next(false);
    this._router.navigate(['login']);
  }
  
  setUser(userCred: UserCredential) {
    sessionStorage.setItem('access_token', userCred.user['accessToken']);
    this.currentUserSignal.set(userCred);
    this.isLoggedIn = userCred ? true : false;
  }

  checkLoggedInStatusAndRoute() {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      this.isLoggedIn = true;
      const email = sessionStorage.getItem('email');
      this.getUserInfo(email);
    }
    else {
      this.isLoggedIn = false;
      this._router.navigate([CommonRoutes.Login]);
    }
  }

  addUser(input: ICreateUserInputModel) {
    const url = `${environment.apiUrl}/user/create`;
    this._http.post<string>(url, input).subscribe(res => {
      this.getUserInfo(res);
    });
  }
  
  getUserInfo(emailId: string) {
    const url = `${environment.apiUrl}/user-info/get-member-info?emailId=${emailId}`;
    this._http.get<IUserInfoOutputModel>(url).subscribe(res => {
      sessionStorage.setItem('email', res.userDetails.email);
      sessionStorage.setItem('shopId', res.shopDetails?.shopId);
      sessionStorage.setItem('shopName', res.shopDetails?.shopName);
      sessionStorage.setItem('roleName', res.rolePermissions[0].roleName);
      navigator.geolocation.getCurrentPosition((position) => {
        sessionStorage.setItem('latitude', `${position.coords.latitude}`);
        sessionStorage.setItem('longitude', `${position.coords.longitude}`);
      });
      const permissions = res.rolePermissions[0].permissions.map(permission => permission.permissionName);
      this._permissionManagerService.setPermissions(permissions);
      this._routeService.initialRoute(res.rolePermissions[0].roleName);
      this.userSub.next(true);
    });
  }
}
