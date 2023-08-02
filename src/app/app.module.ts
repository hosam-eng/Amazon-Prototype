import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BodyComponent } from './Components/body/body.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ParentComponentComponent } from './Components/parent-component/parent-component.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { ProductDetailsDirective } from './Directives/product-details.directive';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductsSearchComponent } from './Components/products-search/products-search.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyInterceptor } from './interceptors/language.inteceptor';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './Components/product-rating/product-rating.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { ShippingaddressComponent } from './Components/shippingaddress/shippingaddress.component';
import { ScroolpageDirective } from './Directives/scroolpage.directive';
import { TrackingorderComponent } from './Components/trackingorder/trackingorder.component';
import { SubCategoriesComponent } from './Components/sub-categories/sub-categories.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ChangeUserProfileComponent } from './Components/change-user-profile/change-user-profile.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    ParentComponentComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    ProductDetailsDirective,
    ProductsSearchComponent,
    ProductRatingComponent,
    CartComponent,
    OrderComponent,
    ShippingaddressComponent,
    ScroolpageDirective,
    TrackingorderComponent,
    SubCategoriesComponent,
    UserProfileComponent,
    ChangeUserProfileComponent,
    ChangePasswordComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
 export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
