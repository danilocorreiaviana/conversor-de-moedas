import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
  loading!: boolean;
  valorMaior!: number;
  simboloOrigem!: string;
  simboloDestino!: string;
  valor!: number;
  valorConvertido!: number;
  taxaConversao!: number
  formConverter: FormGroup = this.formBuilder.group({
    moedaOrigem: ['', [Validators.required, this.moedaValidate]],
    moedaDestino: ['', [Validators.required, this.moedaValidate]],
    valorConversao: ['', [Validators.required, Validators.min(1)]],
  });
  // moedaOrigemControle: any = this.formConverter.get('moedaDestino');
  // moedaDestinoControle: any = this.formConverter.get('moedaDestino');
  // moedaOrigemTexto: string = this.moedaOrigemControle?.value;
  // moedaDestinoTexto: string = this.moedaDestinoControle?.value;

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
    this.loading = true;
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
            this.valorConvertido = +(this.responseData.result).toFixed(4);
            this.taxaConversao = +(this.responseData.info.rate).toFixed(4);
          },
          error: (error: Error) => {
            console.log(error);
          },
          complete: () => {
            this.isDataReturned = true;
            this.loading = false;
          },
        });
      },
      error: (error: Error) => console.log(error),
      complete: () => {
        this.isDataReturned = true;
      },
    });
  }

  reativarValidacao(value1: any, value2: any) {
    value1?.updateValueAndValidity();
    value2?.updateValueAndValidity();
  }

  inverterMoedas() {
    const moedaOrigemControl = this.formConverter.get('moedaOrigem');
    const moedaDestinoControl = this.formConverter.get('moedaDestino');

    const moedaOrigemValue = moedaOrigemControl?.value;
    const moedaDestinoValue = moedaDestinoControl?.value;

    if (moedaOrigemValue === moedaDestinoValue) {
      console.log("Não é possível inverter! Moedas iguais.");
    } else {
      moedaOrigemControl?.setValue(moedaDestinoValue);
      moedaDestinoControl?.setValue(moedaOrigemValue);

      this.reativarValidacao(moedaOrigemControl, moedaDestinoControl);
    }

  }

  moedaValidate(control: AbstractControl) {
    let moedaDestino = control.parent?.get('moedaDestino')?.value;
    let moedaOrigem = control.parent?.get('moedaOrigem')?.value;

    if (moedaOrigem === moedaDestino) {
      return { equalCurrencies: true };

    }
    return null;
  }

  clearError() {
    const moedaOrigemControl = this.formConverter.get('moedaOrigem');
    const moedaDestinoControl = this.formConverter.get('moedaDestino');

    const moedaOrigemValue = moedaOrigemControl?.value;
    const moedaDestinoValue = moedaDestinoControl?.value;

    if (moedaOrigemValue !== moedaDestinoValue) {
      moedaOrigemControl?.setErrors(moedaDestinoValue);
      moedaDestinoControl?.setErrors(moedaOrigemValue);

      this.reativarValidacao(moedaOrigemControl, moedaDestinoControl);

    }

  }



}
