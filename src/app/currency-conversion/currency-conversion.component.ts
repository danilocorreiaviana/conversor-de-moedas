import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { CurrencyConversionService } from '../service/currency-service/currency-conversion.service';
import CurrencyConversion from '../interfaces/currency-conversion-interface/Icurrency-conversion';
import HistoryInterface from '../interfaces/coin-history-interface/Icoin-history';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css'],
  providers: [CurrencyConversionService]
})
export class CurrencyConversionComponent implements OnInit {
  moedas: any[] = [];
  code!: string;
  description!: string[];
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
    valorConversao: ['', [Validators.required, Validators.min(0.01)]],
  });
  msgError!: string;
  isValorMaior: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private coinService: CoinListService,
    private currencyService: CurrencyConversionService,

  ) { }

  ngOnInit(): void {
    this.carregarMoedas();
    this.obterHistorico();
  }

  getDescricao(code: string): string {
    const coin = this.moedas.find(coin => coin.code === code);
    return coin ? coin.description : '';
  }

  carregarMoedas() {
    this.coinService.getCoins().subscribe({
      next: (coins) => {
        this.moedas = coins;
      },
      error: (error) => {
        console.error('Erro ao carregar moedas:', error);
      }
    }
    );
  }

  obterHistorico() {
    let historyData = localStorage.getItem('historico_info');
    if (historyData) {
      return JSON.parse(historyData);
    } else {
      return [];
    }
  }

  salvarHistorico(history: HistoryInterface) {
    let historyData = this.obterHistorico();
    historyData.push(history);
    localStorage.setItem('historico_info', JSON.stringify(historyData));
  }

  armazenarDados() {
    let date = new Date();
    let dia = date.getDate();
    let mes = (date.getMonth() + 1).toString().padStart(2, '0');
    let ano = date.getFullYear();
    let hora = date.getHours();
    let min = date.getMinutes().toString().padStart(2, '0');

    let currentDate =
      dia + '/' + mes + '/' + ano;
    let currentTime =
      hora + ':' + min;

    let historicoInfo: HistoryInterface = {
      date: currentDate,
      time: currentTime,
      input: this.valor,
      output: this.valorConvertido,
      originCurrency: this.simboloOrigem,
      destinyCurrency: this.simboloDestino,
      rate: this.taxaConversao,
      highValue: this.isValorMaior
    };

    this.salvarHistorico(historicoInfo)
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
          this.isValorMaior = true;
          console.log('O valor convertido é maior que 10000 dólares.');
        }
        this.currencyService.converter(from, to, amount).subscribe({
          next: (data: CurrencyConversion) => {
            this.responseData = data;
            this.simboloOrigem = this.responseData.query.from;
            this.simboloDestino = this.responseData.query.to;
            this.valor = this.responseData.query.amount;
            this.valorConvertido = +(this.responseData.result);
            this.taxaConversao = +(this.responseData.info.rate);
            this.armazenarDados();
            this.isValorMaior = false;

          },
          error: (error: Error) => {
            console.log(error);
            this.loading = false;
            this.msgError = error.name;
          },
          complete: () => {
            this.isDataReturned = true;
            this.loading = false;
            this.msgError = '';
          },
        });
      },
      error: (error: Error) => {
        console.log(error);
        this.loading = false;
        this.msgError = error.name;
      },
      complete: () => {
        this.isDataReturned = true;
        // this.loading = false;
        // this.msgError = '';
      },
    });
  }

  limparValor() {
    this.formConverter.get('valorConversao')?.setValue('');
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

    if (moedaOrigemValue === moedaDestinoValue || (!moedaOrigemValue || !moedaDestinoValue)) {
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

  limparErro() {
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