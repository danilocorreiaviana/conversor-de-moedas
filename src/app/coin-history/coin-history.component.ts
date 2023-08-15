import { Component } from '@angular/core';
import HistoryInterface from '../interfaces/coin-history-interface/Icoin-history';

@Component({
  selector: 'app-coin-history',
  templateUrl: './coin-history.component.html',
  styleUrls: ['./coin-history.component.css']
})
export class CoinHistoryComponent {
  history: HistoryInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.obterHistorico();
  }

  obterHistorico() {
    const historyData = this.getData('historico_info');
    if (Array.isArray(historyData)) {
      this.history = historyData;
    } else {
      this.history = [];
    }
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  excluir(index: number) {
    this.history.splice(index, 1);
    localStorage.setItem('historico_info', JSON.stringify(this.history));
    console.log("Conversão removida com sucesso!")
  }

  excluirTudo() {
    localStorage.removeItem('historico_info');
    this.obterHistorico();
    console.log("Histórico de conversão apagado com sucesso!")
  }
}