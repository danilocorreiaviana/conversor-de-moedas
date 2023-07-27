import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { CoinHistoryComponent } from './coin-history/coin-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coin-list', component: CoinListComponent },
  { path: 'currency-conversion', component: CurrencyConversionComponent },
  { path: 'coin-history', component: CoinHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
