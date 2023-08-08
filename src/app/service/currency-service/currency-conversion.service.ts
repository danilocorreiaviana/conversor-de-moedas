import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CurrencyConversionService {
  private apiUrl = 'https://api.exchangerate.host/convert';

  constructor(private http: HttpClient) { }

  converter(fromCurrency: string, toCurrency: string, amount: number) {
    return this.http.get<any>(`${this.apiUrl}?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
  }
}
