import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { CurrencyConversionService } from '../service/currency-service/currency-conversion.service';
import CurrencyConversion from '../interfaces/currency-conversion-interface/Icurrency-conversion';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css'],
  providers: [CurrencyConversionService]
})
export class CurrencyConversionComponent implements OnInit {
  moedas: string[] = [];
  responseData!: CurrencyConversion;
  isDataReturned!: boolean;
  valorMaior!: number;
  simboloOrigem!: string;
  simboloDestino!: string;
  valor!: number;
  valorConvertido!: number;
  taxaConversao!: number
  formConverter: FormGroup = this.formBuilder.group({
    moedaOrigem: ['', [Validators.required]],
    moedaDestino: ['', [Validators.required]],
    valorConversao: ['', [Validators.required, Validators.min(1)]],
  });;

  constructor(private formBuilder: FormBuilder, private coinService: CoinListService, private currencyService: CurrencyConversionService) { }

  ngOnInit(): void {
    this.carregarMoedas();
  }

  carregarMoedas() {
    this.coinService.getCoins().subscribe({
      next: (coins) => {
        this.moedas = coins.map(coin => coin.code);
      },
      error: (error) => {
        console.error('Erro ao carregar moedas:', error);
      }
    }
    );
  }

  submit() {
    this.isDataReturned = false;
    const moedaOrigem = this.formConverter.value.moedaOrigem;
    const moedaDestino = this.formConverter.value.moedaDestino;
    const value = this.formConverter.value.valorConversao;
    this.formConverter.disabled;

    this.converter(moedaOrigem, moedaDestino, value);
    console.log(this.responseData);
  }

  converter(from: string, to: string, amount: number) {
    this.currencyService.converter(from, 'USD', amount).subscribe({
      next: (data: CurrencyConversion) => {
        this.responseData = data;
        this.valorMaior = this.responseData.result;
        if (this.valorMaior > 10000) {
          console.log('O valor convertido é maior que 10000 dólares.');
        }
        this.currencyService.converter(from, to, amount).subscribe({
          next: (data: CurrencyConversion) => {
            this.responseData = data;
            this.simboloOrigem = this.responseData.query.from;
            this.simboloDestino = this.responseData.query.to;
            this.valor = this.responseData.query.amount;
            this.valorConvertido = +(this.responseData.result).toFixed(2);
            this.taxaConversao = +(this.responseData.info.rate).toFixed(2);
          },
          error: (error: Error) => console.log(error),
          complete: () => {
            this.isDataReturned = true;
          },
        });
      },
      error: (error: Error) => console.log(error),
      complete: () => {
        this.isDataReturned = true;
      },
    });
  }

  inverterMoedas() {
    const moedaOrigemValue = this.formConverter.get('moedaOrigem')?.value;
    const moedaDestinoValue = this.formConverter.get('moedaDestino')?.value;

    this.formConverter.get('moedaOrigem')?.setValue(moedaDestinoValue);
    this.formConverter.get('moedaDestino')?.setValue(moedaOrigemValue);
  }
}
