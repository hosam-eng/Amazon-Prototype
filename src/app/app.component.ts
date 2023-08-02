import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private TranslateService:TranslateService){
  this.TranslateService.setDefaultLang('en');
  this.TranslateService.setDefaultLang(localStorage.getItem('lang') || 'en');
}
  title = 'Amazonangular';
}
