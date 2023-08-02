import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icity } from 'src/app/Models/icity';
import { Icountry } from 'src/app/Models/icountry';
import { Igetshippingaddress } from 'src/app/Models/igetshippingaddress';
import { IOrder } from 'src/app/Models/iorder';
import { Ishippingaddress } from 'src/app/Models/ishippingaddress';
import { OrderService } from 'src/app/Services/order.service';
import { ShippingaddressService } from 'src/app/Services/shippingaddress.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { OrderItemService } from 'src/app/Services/order-item.service';
import { IOrderItem } from 'src/app/Models/iorder-item';
import { IProduct } from 'src/app/Models/iproduct';


@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingaddressComponent implements OnInit {
  shippingaddress:Ishippingaddress={} as Ishippingaddress;
  shipping:Igetshippingaddress={} as Igetshippingaddress;
  countryList:Icountry[]=[];
  cityList:Icity[]=[];
  _countryId:number=0;
  userid:string='';
  isCheck:boolean=false;
  isCheckLen:boolean=false;
  Order:IOrder={} as IOrder;
  shippingForm: FormGroup;
  totalPrice: number=0;
  orderId:number=0;
  imgName:string='';
  paidCompleted:boolean=false;
  checkPaid:boolean=false;
  orderItem: IOrderItem = {} as IOrderItem;

  constructor( private shippingaddressService:ShippingaddressService,
    private cartItemService:CartItemService,
    private orderService:OrderService,private router:Router,
    private orderItemService:OrderItemService){

    this.shippingForm=new FormGroup({
      name:new FormControl('', [Validators.required,Validators.minLength(5)]),
      phone:new FormControl('', [Validators.required,Validators.minLength(10)]),
      street:new FormControl('', [Validators.required]),
      buildName:new FormControl('', [Validators.required,Validators.minLength(5)]),
      cityid:new FormControl('', [Validators.required]),
      countryid:new FormControl('', [Validators.required])
    })
    }

    ngOnInit(): void {
      this.getAllcountries();
      this. getAllCitiesBycountryId();
     this.GetShippingAddress();
     this.numOfitemCart();
     this.checklenth();

     render({
      id:"#myPaypalButtons ",
      currency:"USD",
      value:this.totalPrice.toString(),
      onApprove:(details)=>{
        //this.paidCompleted=true;
        //this.createOrder();
        alert("transaction successfully");
      }
    });
    this.checkPaid=this.paidCompleted;
    }

    get name(){
      return this.shippingForm.get('name');
    }
    get phone(){
      return this.shippingForm.get('phone');
    }
    get street(){
      return this.shippingForm.get('street')
    }
    get buildName(){
      return this.shippingForm.get('buildName')
    }
    get cityid(){
      return this.shippingForm.get('cityid')
    }
    get countryid(){
      return this.shippingForm.get('countryid')
     }
    addShippingAddress() {
      const formValues = this.shippingForm.value;
      this.shippingaddress.name = formValues.name;
      this.shippingaddress.phone = formValues.phone;
      this.shippingaddress.street = formValues.street;
      this.shippingaddress.buildname = formValues.buildName;
      this.shippingaddress.cityid = formValues.cityid;
      this._countryId=formValues.countryid;
         console.log(formValues.countryid);
      const id=sessionStorage.getItem('userid');
       if(id!=null)
       {
        this.shippingaddress.userid = id;
      this.shippingaddressService.AddShippingAddress(this.shippingaddress).
      subscribe((data:Ishippingaddress)=>{
        console.log(data);
        this.GetShippingAddress();
        this.isCheck=true
       });
       console.log(this.shippingaddress.userid)
    }

  }
    getAllcountries()
    {
      this.shippingaddressService.GetAllCountries().subscribe(
        (data:any) =>
        {
          this.countryList=data;
        });
    }
    GetShippingAddress()
    {
      const id=sessionStorage.getItem('userid');
      if(id!=null)
      {
       this.userid = id;
      this.shippingaddressService.GetShippingAddress(this.userid).subscribe((data:Igetshippingaddress) =>
      {
        if(data!=undefined)
        {
          this.isCheck=true;
          this.shipping=data;
          console.log(this.shipping);
        }
      })
    }
  }
  numOfitemCart(){
    this.totalPrice=0;
    var productList= this.cartItemService.getCartItems();
    for (var i=0;i<productList.length;i++) {
      this.totalPrice+=productList[i].price * productList[i].Qty;
    }
  }

    getAllCitiesBycountryId()
    {
        console.log(this.countryid?.value)
      this.shippingaddressService.GetAllCitiesByCountryId(this.countryid?.value).subscribe(
        (data:any) =>
        {
          this.cityList=data;
        console.log(data);
        });
    }
    convertProductToOrderItem(product: IProduct): IOrderItem {
      this.orderItem.orderId=this.orderId;
      this.orderItem.productId = product.id;
      this.orderItem.productname = product.name;
      this.orderItem.arabicProductname = product.arabicName;
      this.imgName= product.images[0];
      console.log(product.images[0]);
      this.orderItem.imgUrl = this.imgName;
      this.orderItem.count = product.Qty;
      this.orderItem.productPrice = product.price;
      this.orderItem.supTotalPrice=product.price*product.Qty;
      return this.orderItem;
    }
    checklenth()
    {
      const items = this.cartItemService.getCartItems();
      if(items.length>0)
      {
       this.isCheckLen=true;
      }

    }

    addOrderItems() {
      const items = this.cartItemService.getCartItems();


      for (const item of items) {
          this.orderItemService.addOrderItem(this.convertProductToOrderItem(item)).
          subscribe((data:any)=>{console.log(data);});
          }
      this.cartItemService.clearCart();
    }

    createOrder(){
      var date = new Date();
      this.Order.orderDate = date;
      const newDate = new Date(date.getTime());
      newDate.setDate(date.getDate()+4);
      this.Order.arrivalDate=newDate;
      const id=sessionStorage.getItem('userid');
    this.Order.status=0;
    this.Order.total=this.totalPrice;
      if(id!=null){
        this.Order.userId=id;
      }
      console.log(this.Order);
      this.orderService.CreateOrder(this.Order).subscribe(
         (data:IOrder) => {
          this.orderId=data.id;
          this.addOrderItems();
             this.navigateToOrder(data.id);

      })
      }
      navigateToOrder(id: number) {
        this.router.navigate(['/Order', id]);
      }

  }





