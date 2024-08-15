import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './@core/component/login/login.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddSellerComponent } from './pages/add-seller/add-seller.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CommonRoutes, SellerRoutes } from './@core/router/route.constant';
import { AuthGuard } from './@core/utils/auth.guard';
import { AddSellerRequestComponent } from './pages/add-seller-request/add-seller-request.component';
import { AllCategoriesPageComponent } from './pages/all-categories-page/all-categories-page.component';
import { SubcategoryGalleryComponent } from './pages/subcategory-gallery/subcategory-gallery.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CustomerHomeComponent } from './pages/customer-home/customer-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: CommonRoutes.Login, component: LoginComponent },
  { path: SellerRoutes.Home, component: SellerHomeComponent, canActivate: [AuthGuard] },
  { path: 'customer-home', component: CustomerHomeComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'add-seller', component: AddSellerComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'add-seller-request', component: AddSellerRequestComponent, canActivate: [AuthGuard] },
  { path: 'all-categories', component: AllCategoriesPageComponent },
  { path: 'subcategories/:id', component: SubcategoryGalleryComponent },// ProductDetailComponent
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
