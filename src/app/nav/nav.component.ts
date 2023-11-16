import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  title = 'Conversor de Moedas';

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  toggleNavbar() {
    const navbarToggler = this.el.nativeElement.querySelector('.navbar-toggler');
    const navbarCollapse = this.el.nativeElement.querySelector('.navbar-collapse');

    if (window.getComputedStyle(navbarToggler).visibility !== 'hidden') 
      this.renderer.addClass(navbarToggler, 'collapsed');
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }

