import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Conversor de Moedas';

  public buttonIsVisible: boolean = window.innerWidth < 991;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.buttonIsVisible = window.innerWidth < 991;
  }
}