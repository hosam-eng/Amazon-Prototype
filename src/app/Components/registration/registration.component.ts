import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/Models/iuser-register';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form: FormGroup;
  user:IUserRegister={} as IUserRegister;
  isCheck:boolean=false;
  showErrorMessage:boolean=false;
  contentErrorMessage:string="";
  constructor(private userService:UserService,private router:Router,private fb: FormBuilder){
    this.form = this.fb.group({
      userName:['',Validators.required],
      EmailAddress:['',[Validators.required]],
      Password: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],
      ConfirmPassword: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]]
    },
    {
      validator: ConfirmedValidator('Password', 'ConfirmPassword')
    })
  }


  get userName(){
    return this.form.get('userName');
  }
  get EmailAddress(){
    return this.form.get('EmailAddress');
  }
  get Password(){
    return this.form.get('Password');
  }
  get ConfirmPassword(){
    return this.form.get('ConfirmPassword');
  }

  register(){
    this.user=this.form.value
    this.isCheck=isNaN(Number(this.form.get("EmailAddress")))
    if(this.isCheck)
    {
    this.user.Phone=this.user.EmailAddress;
    this.user.EmailAddress=undefined;
    }
   // console.log(this.user);

    this.userService.Register(this.user).subscribe(
      (data)=>{
      this.router.navigate(['/Login'])

  },
  (error)=>{
    this.contentErrorMessage="Invalid Registration,Try again";
    console.log(this.contentErrorMessage);
    this.showErrorMessage=true

  }
  );
   }
}
