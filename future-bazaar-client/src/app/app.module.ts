import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SideNavComponent } from './@shared/components/side-nav/side-nav.component';
import { HeaderComponent } from './@shared/components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomNavComponent } from './@core/component/bottom-nav/bottom-nav.component';
import { MatListModule } from '@angular/material/list';
import { BottomSheetComponent } from './@core/component/bottom-sheet/bottom-sheet.component';

const firebaseConfig = {
  apiKey: "AIzaSyAc_QBJgVkUXC0wWRt-TvOk3l-C27ZPzp8",
  authDomain: "lokal-bazaar.firebaseapp.com",
  projectId: "lokal-bazaar",
  storageBucket: "lokal-bazaar.appspot.com",
  messagingSenderId: "657737271694",
  appId: "1:657737271694:web:8bf460f52b58fe13f4bcdf"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    BottomNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatBottomSheetModule,
    MatButtonModule,
    HttpClientModule,
    BottomSheetComponent
  ],
  providers: [
    importProvidersFrom(
      [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth())
      ]
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
