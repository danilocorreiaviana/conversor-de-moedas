import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from './coin-list.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

@NgModule({
  declarations: [
    CoinListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
})
export class CoinListModule { }
