import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from 'src/app/Models/icategory';
import { ISubCategory } from 'src/app/Models/isub-category';
import { IUserProfile } from 'src/app/Models/iuser-profile';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  _productName: string="";
  userId?:string;
  numberItemsInCart:number=0;
  user:IUserProfile={} as IUserProfile;
  get prodname():string{
    return this._productName;
  }
  set prodname(value:string){
    this._productName=value;
  }
  CategoryList:ICategory[]=[];
  SubCategoryList:ISubCategory[]=[];
  categoryId:number;
  isLoggedin:boolean=false;
  constructor(
    private categoryservice: CategoryService,
    private router: Router,private userService:UserService,
    private cartItemService:CartItemService
    ,private userProfileService:UserProfileService)
  {
    this.categoryId=0;
  }

  ngOnInit(): void {
    this.isLoggedin= this.userService.isLoggedIn;
    this.numberItemsInCart= this.cartItemService.getCartItems().length;
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
      console.log(this.CategoryList);

    });

    this._lang=sessionStorage.getItem('lang')||'en';

    this.userId=sessionStorage.getItem('userid')||'';
    this.userProfileService.getUserById(this.userId).subscribe(data=>{
      this.user=data;
    });
  }
  onSearchButtonClick(searchInputValue: string): void {
    this.router.navigate(['/products'], { queryParams: { sentCatid:this.categoryId,term: searchInputValue } });
    //this.router.navigate(['/products',this.categoryId,searchInputValue]);
  }
  _lang:string='en';
  get Changlang(){
    return this._lang;
  }
  set Changlang(value:string){
    this._lang=value;
    sessionStorage.setItem('lang',value);
    window.location.reload();
  }

  Logout(){
    this.userService.LogOut();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userid');

    this.router.navigate(['/Login']);
  }
  goToProfile(){
    this.router.navigate(['/profile']);
  }

}
