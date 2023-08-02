import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    this._lang=localStorage.getItem('lang')||'en';
  }

  _lang:string='en';
  get Changlang(){
    return this._lang;
  }
  set Changlang(value:string){
    this._lang=value;
    localStorage.setItem('lang',value);
    window.location.reload();
  }
}
