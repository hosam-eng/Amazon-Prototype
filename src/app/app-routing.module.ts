import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { BodyComponent } from './Components/body/body.component';
import { ParentComponentComponent } from './Components/parent-component/parent-component.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { ProductsSearchComponent } from './Components/products-search/products-search.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { ProductRatingComponent } from './Components/product-rating/product-rating.component';
import { ShippingaddressComponent } from './Components/shippingaddress/shippingaddress.component';
import { userAuthGuard } from './Guards/user-auth.guard';
import { TrackingorderComponent } from './Components/trackingorder/trackingorder.component';
import { SubCategoriesComponent } from './Components/sub-categories/sub-categories.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ChangeUserProfileComponent } from './Components/change-user-profile/change-user-profile.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';

const routes: Routes = [
    {path:'',component:ParentComponentComponent,children:[
    {path:'',redirectTo:"Home",pathMatch:'full'},
    {path:'Home',component:BodyComponent,title:"Home"},
    {path:'Products/:catid',component:ProductsComponent,title:"Get Products"},
    {path:'products',component:ProductsSearchComponent},
    {path:'ProductsDetails/:prodid',component:ProductsDetailsComponent,title:"Get Products Details"},
    {path:'Cart',component:CartComponent,title:" Cart"},
    {path:'tracking',component:TrackingorderComponent,title:" Tracking Package"},
    {path:'tracking/:orderId',component:TrackingorderComponent,title:" Tracking Package"},
    {path:'Subcategories/:catid',component:SubCategoriesComponent,title:"Get Subcategories"},
    {path:'Order',component:OrderComponent,title:" Order",canActivate:[userAuthGuard]},
    {path:'Order/:orderId',component:OrderComponent,title:" Order",canActivate:[userAuthGuard]},
    {path:'ProductRating',component:ProductRatingComponent,title:" Rate",canActivate:[userAuthGuard]},
    {path:'shipping',component:ShippingaddressComponent,title:" Shipping Address",canActivate:[userAuthGuard]},
    {path:'profile',component:UserProfileComponent,title:" user profile",canActivate:[userAuthGuard]},
    {path:'changeUserProfile',component:ChangeUserProfileComponent,title:"change user profile",canActivate:[userAuthGuard]},
    {path:'changePassword',component:ChangePasswordComponent,title:"change user password",canActivate:[userAuthGuard]}

  ]},
  {path:'register' , component:RegistrationComponent,title:"Registeration"},
  {path:'Login' , component:LoginComponent,title:"Login"},
  {path:'Login' , component:LoginComponent,title:"Login"},
  {path:'**',component:NotfoundComponent,title:"Not found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
