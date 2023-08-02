import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserProfile } from 'src/app/Models/iuser-profile';
import { UserProfileService } from 'src/app/Services/user-profile.service';

@Component({
  selector: 'app-change-user-profile',
  templateUrl: './change-user-profile.component.html',
  styleUrls: ['./change-user-profile.component.css']
})
export class ChangeUserProfileComponent implements OnInit {

    id?:string|null;
    userchange:string='';
    key?:string|null;
    form:FormGroup;
    userProfile:IUserProfile={} as IUserProfile;
    constructor (private activatedRoute: ActivatedRoute,private userProfileService:UserProfileService,
      private location:Location,private fb:FormBuilder){
        this.form = this.fb.group({
          userName:['',[Validators.required]],
          phone:['',[Validators.required]],
          emailAddress:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
        })
        
    }
    get userName(){
      return this.form.get('userName');
    }
    get phone(){
      return this.form.get('phone');
    }
    get emailAddress(){
      return this.form.get('emailAddress');
    }
    public ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap=>{

        this.form.patchValue({
          userName:paramMap.get('name')||'',
          phone:paramMap.get('phone')||'',
          emailAddress:paramMap.get('email')||null
        })
        this.key= paramMap.get('key');
    })
    this.id=sessionStorage.getItem('userid');
    console.log(this.userProfile);
    console.log(this.form.value);
  }

  saveChanges(){
        if(this.id)
        {
          if(this.emailAddress?.value=="null")
          {
            this.form.patchValue({
              emailAddress:null
            })
          }
         this.userProfileService.updateUser(this.id,this.form.value).subscribe(data=>{
          this.location.back();
         })
        }
      }
    
}

