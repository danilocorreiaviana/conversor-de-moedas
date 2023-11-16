import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { CoinHistoryComponent } from './coin-history/coin-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coin-list', component: CoinListComponent },
  { path: 'currency-conversion', component: CurrencyConversionComponent },
  { path: 'coin-history', component: CoinHistoryComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
