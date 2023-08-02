import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroolpage]'
})
export class ScroolpageDirective {

  constructor() { }
  @HostListener('click', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
}
