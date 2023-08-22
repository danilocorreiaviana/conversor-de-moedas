import { Component } from '@angular/core';
import HistoryInterface from '../interfaces/coin-history-interface/Icoin-history';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-coin-history',
  templateUrl: './coin-history.component.html',
  styleUrls: ['./coin-history.component.css']
})
export class CoinHistoryComponent {
  title = 'Histórico de Conversões';
  history: HistoryInterface[] = [];
  filtroOrdenacao: string = 'TimeAsc';
  historyDelete: boolean = false;
  conversionDelete: boolean = false;

  constructor(private dialog: MatDialog) { }

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

  OrdenarHistorico(filtro: string) {
    this.filtroOrdenacao = filtro;
    if (filtro === "TimeAsc") {
      this.history.sort((a, b) => a.time.localeCompare(b.time))
    } else if (filtro === "TimeDesc") {
      this.history.sort((a, b) => b.time.localeCompare(a.time))
    } else if (filtro === "OutputAsc") {
      this.history.sort((a, b) => a.output - b.output);
    } else if (filtro === "OutputDesc") {
      this.history.sort((a, b) => b.output - a.output);
    }

  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  exibirDialogoExclusaoConversao(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Você tem certeza de que deseja remover esta conversão?',
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.excluir(index);
      }
    });
  }

  exibirDialogoExclusaoTodo() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Você tem certeza de que deseja remover todo o histórico?',
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.excluirTudo();
      }
    });
  }

  excluir(index: number) {
    this.history.splice(index, 1);
    localStorage.setItem('historico_info', JSON.stringify(this.history));
    this.conversionDelete = true;
    setTimeout(() => {
      this.conversionDelete = false;
    }, 2000);
    console.log("Conversão removida com sucesso!")
  }

  excluirTudo() {
    localStorage.removeItem('historico_info');
    this.obterHistorico();
    this.historyDelete = true;
    setTimeout(() => {
      this.historyDelete = false;
    }, 2000);
    console.log("Histórico de conversão apagado com sucesso!")
  }

}