import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { OrderService } from './order.service';
import { IOrder } from '../Models/iorder';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  userid: string="";
  cartItems: IProduct[] = [];
 flag:Boolean=false;
 constructor() {
    const id = sessionStorage.getItem('userid');
    if(id!=null)
    {
      this.userid=id
      const cartItems=localStorage.getItem(this.userid);
      if(cartItems) {
        this.cartItems = JSON.parse(cartItems);
      }
    }
 }

 addToCart(product: IProduct) {
   this.checkProduct(product);
   if(!this.flag){
     this.cartItems.push(product);
   }
   console.log(this.userid);
   localStorage.setItem(this.userid, JSON.stringify(this.cartItems));
   localStorage.setItem('counter', JSON.stringify(this.cartItems.length));
   console.log(this.cartItems.length);
 }

 removeFromCart(productId?:number){
  var updatedItems= this.getCartItems().filter(i=>i.id !==productId);
  this.cartItems=updatedItems;
  localStorage.setItem(this.userid, JSON.stringify(this.cartItems));
  localStorage.setItem('counter', JSON.stringify(this.cartItems.length));

 }

 updateCartItem(productId:number,qty:number){
   const index =  this.getCartItems().findIndex(item => item.id === productId);
   if (index !== -1) {
     this.getCartItems()[index].Qty = qty;
   }
  localStorage.setItem(this.userid, JSON.stringify(this.cartItems));
  localStorage.setItem('counter', JSON.stringify(this.cartItems.length));
 }

 checkProduct(product: IProduct) {
   var products= this.getCartItems();
   for (var item of products) {
     if(item.id==product.id)
     {
       item.Qty+=Number(product.Qty);
       this.flag=true;
       break;
     }
 }
 }

 getCartItems(): IProduct[] {
   return this.cartItems;
 }

 clearCart() {
   this.cartItems = [];
   localStorage.setItem(this.userid, JSON.stringify(this.cartItems));
   localStorage.setItem('counter', JSON.stringify(this.cartItems.length));
   return this.cartItems;
 }

 RemoveCart() {
   this.cartItems = [];
   localStorage.removeItem(this.userid);
   localStorage.removeItem("counter");
   return this.cartItems;
 }
}
