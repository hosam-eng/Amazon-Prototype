import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IChangePassword } from 'src/app/Models/ichange-password';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup;
  userId:string='';
  useroldPassword:string='';
  usernewPassword:string='';
  changePasswordModel:IChangePassword={} as IChangePassword;
  constructor(private fb:FormBuilder,private userProfileService:UserProfileService,private location:Location){
    this.form = this.fb.group({
      oldPassword:['',[Validators.required]],
      newPassword: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],    
      reenternewPassword: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],    
    },
    { 
      validator: ConfirmedValidator('newPassword', 'reenternewPassword')
    })
  }
  ngOnInit(): void {
   this.userId = localStorage.getItem('userid')||'';
  }
  get oldPassword(){
    return this.form.get('oldPassword');
  }
  get newPassword(){
    return this.form.get('newPassword');
  }
  get reenternewPassword(){
    return this.form.get('reenternewPassword');
  }
  changePassword(){
    this.changePasswordModel.oldPassword=this.form.get('oldPassword')?.value;
    this.changePasswordModel.newPassword=this.form.get('newPassword')?.value;
    this.changePasswordModel.userId=this.userId;
    console.log(this.changePasswordModel);
    
    this.userProfileService.ChangePassword(this.changePasswordModel)
    .subscribe(data=>{
      this.location.back();
     } )
  }
}
