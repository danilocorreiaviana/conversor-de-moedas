import { Component, OnInit } from '@angular/core';
import { CoinListService } from '../service/api.service';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent implements OnInit {
  moedasOrigem: string[] = [];
  moedasDestino: string[] = [];
  moedaOrigemSelecionada: string = '';
  moedaDestinoSelecionada: string = '';

  constructor(private currencyApiService: CoinListService) { }

  ngOnInit(): void {
    this.carregarMoedas();
  }

  carregarMoedas() {
    this.currencyApiService.getCoins().subscribe({
      next: (coins) => {
        this.moedasOrigem = coins.map(coin => coin.code);
        this.moedasDestino = coins.map(coin => coin.code);
      },
      error: (error) => {
        console.error('Erro ao carregar moedas:', error);
      }
    }
    );
  }
}
