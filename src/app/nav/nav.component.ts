import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  title = 'Conversor de Moedas';

  toggleNavbar() {
    if ($('.navbar-toggler').is(':visible')) {
      $('.navbar-collapse').collapse('hide');
      $('.navbar-toggler').addClass('collapsed');
    }
  }
}
