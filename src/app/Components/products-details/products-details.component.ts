import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IRating } from 'src/app/Models/irating';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { ProductRatingService } from 'src/app/Services/product-rating.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  images:string[]=[];
  @ViewChild('popup', { static: false }) myElementRef?: ElementRef;

  //@ViewChild('popup') myElementRef: ElementRef|undefined;
  prodid: number=0;
  catid:number=1;
  Quantity:number=1;
  numbers: number[]=[];
  product:IProduct|undefined;
  customerReviews:IRating[]=[];
  productRates:{[rate:number]:number}={}
  productRating:number=0;
  reviewsCount:number=0;
  products:IProduct[]=[];
  firstImage:string="";
  language:string=sessionStorage.getItem("lang") || "en";
  constructor(private productservice:ProductService,private route:Router,
    private activerouter:ActivatedRoute,private cartItemService:CartItemService,
    private productRatingService: ProductRatingService,){
    }
  ngOnInit(): void {
    this.prodid=this.activerouter.snapshot.paramMap.get('prodid')?Number(this.activerouter.snapshot.paramMap.get('prodid')):0;
    this.productservice.GetProductById(this.prodid).subscribe(data=>{
      this.product=data;
      this.productservice.GetProductByCategoryId(this.product?.categoryId).subscribe(data=>{
        this.products=data;
         this.firstImage = this.product?.images[0]||"kkkkk";
        console.log(this.products);
      });
      this.numbers = [...Array(10).keys()].map(i => i + 1);
    })
    
    console.log(this.catid)
    this.productRatingService.GetRatingByProductId(this.prodid).subscribe(data=>{
      this.customerReviews=data;
       this.reviewsCount = data.length
      var sum=0;
      data.forEach(a=>sum+=a.rate)
       this.productRating=Math.ceil(sum/this.reviewsCount)
    })

    this.productRatingService.CalculateProductRating(this.prodid).subscribe(data=>{
      this.productRates=data;
      for(var i=1;i<=5;i++)
      {
       if(data[i]==undefined){
        this.productRates[i]=0
       }
      }
    });
  }
addToCart(product?:IProduct){
  if(product)
  {
    product.Qty=Number(this.Quantity);
    this.cartItemService.addToCart(product);
    this.show();
    console.log(product);
  }
}

ProductRate(product?:IProduct){
  if(product)
  {
    this.route.navigate(['ProductRating',{id:this.prodid,name:product.name,imgUrl:product.images[0]}])
  }
}
show() {
  if(this.myElementRef)
  {
    const myElement = this.myElementRef?.nativeElement;
    myElement.style.display="block";
  }
}
  close()
  {
    const myElement = this.myElementRef?.nativeElement;
    myElement.style.display="none";
  }


}


