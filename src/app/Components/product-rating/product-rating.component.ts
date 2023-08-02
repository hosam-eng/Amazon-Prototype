import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRating } from 'src/app/Models/irating';
import { IUserProfile } from 'src/app/Models/iuser-profile';
import { ProductRatingService } from 'src/app/Services/product-rating.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';
@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {

  productId?:number|null;
  productName?:string|null;
  productImg?:string|null;
  showButton:boolean=false;
  countrate?:number|null;
  userForm: FormGroup;
  productRate:IRating={} as IRating;
  isValid:boolean=false;
  userId?:string;
  user:IUserProfile={} as IUserProfile;
constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,
  private productRatingService: ProductRatingService,private location:Location,private userProfileService:UserProfileService){
this.userForm=this.fb.group({
  review:[''],
 userName:[''],
 rate:[,Validators.min(1)]
})
}
get review(){
  return this.userForm.get('review');
}
get userName(){
  return this.userForm.get('userName');
}
get rate(){
  return this.userForm.get('rate');
}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.productId=Number(paramMap.get('id'));
      this.productName=paramMap.get('name');
    this.productImg= paramMap.get('imgUrl');
    this.userId=sessionStorage.getItem('userid')||'';
    this.userProfileService.getUserById(this.userId).subscribe(data=>{
      this.user=data;
    });
   })
  }
  addRate(){
    this.userForm.patchValue({
      rate:this.countrate
    })
    this.productRate=this.userForm.value
    if(this.productId)
    {
    this.productRate.productId=this.productId
    }
    this.productRatingService.AddRate(this.productRate).subscribe(data=>
      {
        console.log(data);
        this.location.back();
      })
   }

selectRate(event:any){
    var target=event.target;
    var id=Number(target.id);
    this.countrate=0
    const starDiv = document.querySelector('.starRating');
    if(starDiv!=null)
    {
      const elements =Array.from(starDiv.children);
    for(var i=0;i<id;i++){
      elements[i].classList.add("checked");
      this.countrate+=1
    }
    for(var i=id;i<5;i++){
      elements[i].classList.remove("checked");
    }
  }
  this.isValid=true;
}
clearRate(){
  const starDiv = document.querySelector('.starRating');
  this.countrate=0
  if(starDiv!=null)
  {
    const elements =Array.from(starDiv.children);
  for(var i=0;i<elements.length;i++){
    elements[i].classList.remove("checked");
  }
}
this.isValid=false;
}
}
