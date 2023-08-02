import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { IUserProfile } from 'src/app/Models/iuser-profile';
import { UserProfileService } from 'src/app/Services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile:IUserProfile={} as IUserProfile;
  userId?:string|null;
  constructor(private userProfileService: UserProfileService,private router:Router){}

  ngOnInit(): void {
     this.userId=sessionStorage.getItem('userid');
     if(this.userId!=null)
     {
     this.userProfileService.getUserById(this.userId).subscribe(
      data=>{
        this.userProfile=data;
        }
     )
    }
  }
  navigateToChange(key:string){
    this.router.navigate(['changeUserProfile',{name:this.userProfile.userName,
      phone:this.userProfile.phone,email:this.userProfile.emailAddress,key:key}]);
  }
  changePassword(){
    this.router.navigate(['changePassword']);
  }
}
