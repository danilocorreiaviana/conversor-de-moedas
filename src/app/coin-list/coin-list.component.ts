import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from './Icoin-list';
import { map, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CoinListService } from '../service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  // apiUrl = 'https://api.exchangerate.host/symbols';
  coinList: Coin[] = [];
  coinListCompleta: Coin[] = [];
  totalMoedas: number = 0;
  paginaAtual = 1;
  itensPorPagina = 5
  busca: string = '';
  campoOrdenacao: string = 'code';
  filtroOrdenacao: string = 'symbolAsc'
  loading = true;

  constructor(private coinService: CoinListService) { }

  ngOnInit(): void {
    this.carregarCoinList();
  }

  // carregarCoinList() {
  //   this.http.get<any>(this.apiUrl).pipe(
  //     map((response) => {
  //       this.coinListCompleta = Object.keys(response.symbols).map((key) => ({
  //         code: key,
  //         description: response.symbols[key].description,
  //       }));
  //       this.coinList = this.coinListCompleta.slice(); // Cópia da lista completa
  //       this.totalMoedas = this.coinList.length; // Definir o total de moedas
  //     }),
  //     catchError((error) => {
  //       return throwError(() => error);
  //     }),
  //     finalize(() => {
  //       this.loading = false;
  //     })
  //   ).subscribe();
  // }

  carregarCoinList() {
    this.coinService.getCoins().subscribe({
      next: (coins: Coin[]) => {
        this.coinListCompleta = coins;
        this.coinList = this.coinListCompleta.slice();
        this.totalMoedas = this.coinList.length;
        this.loading = false;
      },
      error: (error) => { 
        console.log(error);
        this.loading = false;
      }
    });
  }

  // this.http.get<any>(this.apiUrl).pipe(
  //   map((response) => {
  //     this.coinListCompleta = Object.keys(response.symbols).map((key) => ({
  //       code: key,
  //       description: response.symbols[key].description,
  //     }));
  //     this.coinList = this.coinListCompleta.slice(); // Cópia da lista completa
  //     this.totalMoedas = this.coinList.length; // Definir o total de moedas
  //   }),
  //   catchError((error) => {
  //     return throwError(() => error);
  //   }),
  //   finalize(() => {
  //     this.loading = false;
  //   })
  // ).subscribe();

  buscarCoins() {
    const valorBusca = this.busca.trim().toLowerCase();

    if (!valorBusca) {
      this.coinList = this.coinListCompleta.slice(); // Restaurar a lista completa
      this.totalMoedas = this.coinListCompleta.length; // Atualizar o total de moedas
      this.ordenarPor(this.filtroOrdenacao);
    } else {
      this.coinList = this.coinListCompleta.filter(coin =>
        this.verificarTexto(coin.code, valorBusca) ||
        this.verificarTexto(coin.description, valorBusca)
      );
      this.totalMoedas = this.coinList.length; // Atualizar o total de moedas após a busca
    }

    // Verificar se a página atual está fora dos limites após a busca
    if (this.paginaAtual > Math.ceil(this.totalMoedas / this.itensPorPagina)) {
      this.paginaAtual = Math.max(1, Math.ceil(this.totalMoedas / this.itensPorPagina));
    }
  }

  private verificarTexto(texto: string, valorBusca: string): boolean {
    return texto.toLowerCase().includes(valorBusca);
  }

  limparBusca() {
    this.busca = '';
    this.coinList = this.coinListCompleta.slice();
    this.totalMoedas = this.coinListCompleta.length;
    this.ordenarPor(this.filtroOrdenacao);
  }

  ordenarPor(opcao: string) {
    this.filtroOrdenacao = opcao;
    switch (opcao) {
      case 'symbolAsc':
        this.coinList.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case 'symbolDesc':
        this.coinList.sort((a, b) => b.code.localeCompare(a.code));
        break;
      case 'descriptionAsc':
        this.coinList.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'descriptionDesc':
        this.coinList.sort((a, b) => b.description.localeCompare(a.description));
        break;
      default:
        break;
    }
  }

  atualizarPaginacao(pagina: number) {
    this.paginaAtual = pagina;
    if (!this.itensPorPagina) {
      this.itensPorPagina = 5;
    }
  }
}
