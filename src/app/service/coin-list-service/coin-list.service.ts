import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coin } from '../../interfaces/coin-list-interface/Icoin-list';

@Injectable({
  providedIn: 'root'
})
export class CoinListService {
  private apiUrl = 'https://api.exchangerate.host/';

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get<any>(this.apiUrl + 'symbols').pipe(
      map((response) => {
        return Object.keys(response.symbols).map((key) => ({
          code: key,
          description: response.symbols[key].description,
        }));
      })
    );
  }
}
