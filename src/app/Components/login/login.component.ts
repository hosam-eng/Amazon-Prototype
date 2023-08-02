import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserLogin } from 'src/app/Models/iuser-login';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  user:IUserLogin={} as IUserLogin;
  showErrorMessage:boolean=false;
   isCheck:boolean=false;
   userLoggedBehSubject:BehaviorSubject<boolean>;
   constructor(private userService:UserService,private router:Router,
               private fb:FormBuilder){
                this.userLoggedBehSubject=new BehaviorSubject<boolean>(this.isLogged);
                 this.form = this.fb.group({
                   EmailAddress:['',[Validators.required]],
                   password: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],
                 })
               }
               get EmailAddress(){
                 return this.form.get('EmailAddress');
               }
               get Password(){
                 return this.form.get('password');
               }
               get isLogged():boolean {
                return (sessionStorage.getItem('token'))?true:false;
              }
   login() {
     this.addEmailOrPhone(this.form.value);  
     this.userService.login(this.user).subscribe(
       (data) => {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('userid', data.userId)
         if (!localStorage.getItem('data.userId')===null) {
           localStorage.setItem(data.userId,'');
         }    
         this.router.navigate(['/Home']);
       },
       (error)=>{
        this.showErrorMessage=true       
       }
     ); 
  }  
  addEmailOrPhone(userModel : any){
    this.user=userModel;
    this.isCheck = isNaN(Number(this.user.EmailAddress));
    if (!this.isCheck) {
      this.user.Phone = this.user.EmailAddress;
      this.user.EmailAddress = undefined;
    }
  }   
 }