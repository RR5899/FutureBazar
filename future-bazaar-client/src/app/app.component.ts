import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean;
  constructor(private _authService: AuthService) {

  }
  
  ngOnInit() {
    this._authService.checkLoggedInStatusAndRoute();
    this._authService.userSub.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}
