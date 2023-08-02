import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appProductDetails]'
})
export class ProductDetailsDirective {

  constructor(private element:ElementRef) { }
  @HostListener('click') imgChanges(){
    var src:any=this.element.nativeElement.src;
    var prev:any=document.getElementById("preview");
    prev.src=src;
    var imgslide=document.getElementsByClassName("img-slide");
    for(let i=0;i<imgslide.length;i++){
      imgslide[i].classList.remove("active");
    }
    this.element.nativeElement.parentElement.classList.add("active");
  }
}
