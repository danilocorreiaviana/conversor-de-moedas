import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coin } from '../../interfaces/coin-list-interface/Icoin-list';

@Injectable({
  providedIn: 'root'
})

export class CoinListService {

  private apiUrl = 'https://api.coinbase.com/v2/currencies';

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map((data: any) => {
          return data.data.map((item: any) => ({
            code: item.id,
            description: item.name
          }));
        })
      )

  }

}
