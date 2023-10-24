import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CurrencyConversionService {

  private apiUrl = 'https://api.coinbase.com/v2/prices';

  constructor(private http: HttpClient) { }

  converter(fromCurrency: string, toCurrency: string, amount: number) {
    return this.http.get<any>(`${this.apiUrl}/${fromCurrency}-${toCurrency}/buy?${amount}`);
  }
}
