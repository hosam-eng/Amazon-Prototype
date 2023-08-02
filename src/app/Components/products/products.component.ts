import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { IProduct } from 'src/app/Models/iproduct';
import { IRating } from 'src/app/Models/irating';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { PriceVM } from 'src/app/ViewModel/price-vm';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  catid: number = 0;


  products: IProduct[] = [];
  subcategories: ISubCategory[] = [];
  page: number = 1;
  itemsperpage: number = 3;
  lnaguage:string="en";

  numbers: number[]=[];
  product:IProduct|undefined;
  customerReviews:IRating[]=[];
  productRates:{[rate:number]:number}={}
  productRating:number=0;
  reviewsCount:number=0;


  constructor(
    private activeroute: ActivatedRoute,private productservices: ProductService,
    private subcategoryservice: CategoryService,private cartItemService:CartItemService
  ) {
  }

  ngOnInit(): void {
    this.catid = this.activeroute.snapshot.paramMap.get('catid')
      ? Number(this.activeroute.snapshot.paramMap.get('catid'))
      : 0;
      this.lnaguage=sessionStorage.getItem('lang') || 'en';
    this.productservices
      .GetProductByCategoryId(this.catid)
      .subscribe((data) => {
        this.products = data;
      });

    this.productservices
      .GetProductByCategoryId(this.catid)
      .subscribe((data) => {
        this.products = data;
      });

    this.subcategoryservice.GetAllSubCategoryes().subscribe((data) => {
      this.subcategories = data;
    });


  }

  GetPricedProducts(min: any, max: any) {
    console.log('print category Id');
    console.log(this.catid);
    let minprice:number=parseInt(min);
    let maxprice:number=parseInt(max);
    this.productservices
      .GetProductsbyPrice(this.catid, minprice, maxprice)
      .subscribe((data) => {
        this.products = data;
      });
  }
  GetPricedProductsAbove(price: number) {
    this.productservices
      .GetProductsbyPriceMax(this.catid, price)
      .subscribe((data) => {
        this.products = data;
      });
  }
  GetProductsBysubcategory(id: number) {
    this.productservices.GetProductByCategoryId(id).subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product?:IProduct){
    if(product)
    {
      product.Qty=1;
      var result=this.cartItemService.addToCart(product);
    }
  }
}
