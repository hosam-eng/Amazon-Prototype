import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/Models/iorder';
import { IOrderItem } from 'src/app/Models/iorder-item';
import { IProduct } from 'src/app/Models/iproduct';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { OrderItemService } from 'src/app/Services/order-item.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @ViewChild('popup', { static: false }) myElementRef?: ElementRef;
  orderIdDelete:number = 0;
  orderItem: IOrderItem = {} as IOrderItem;
  order: IOrder = {} as IOrder;
  orders: IOrder[] = [];
  total: number = 0;
  orderId:number=0;
  imgName:string='';
  language:string=sessionStorage.getItem('lang') || "en";
  constructor(
    private cartItemService: CartItemService,
    private orderItemService: OrderItemService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit(): void {

    this. getAllOrder();

  }

  getAllOrder()
  {
      const id = sessionStorage.getItem('userid');
      if (id != null) {
        this.orderService.GetAllOrdersByUserId(id).subscribe((data: any) => {
          this.orders = data;
        });
      }
    }
  trackPackage(id: number) {
    this.router.navigate(['/tracking', id]);
  }
  cancelOrder() {
     this.orderService.GetOrderById( this.orderIdDelete).subscribe((data:IOrder) =>
     {
      this.order=data;
      if (this.order.status < 2) {
        this.orderService.DeleteOrder(this.orderIdDelete).subscribe(()=>{
          this.getAllOrder();
        });
        this.close();
      }
    });
  }
  show(id:number) {
    this.orderIdDelete=id;
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
