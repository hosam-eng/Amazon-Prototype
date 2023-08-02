import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  
  const userAuth=inject(UserService);
  const router=inject(Router);
  if(userAuth.isLoggedIn)
   return true;
   else
   {
    router.navigate(['/Login']);
    return false;
   } 
};
