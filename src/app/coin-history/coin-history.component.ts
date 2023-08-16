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
  history: HistoryInterface[] = [];

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
    console.log("Conversão removida com sucesso!")
  }

  excluirTudo() {
    localStorage.removeItem('historico_info');
    this.obterHistorico();
    console.log("Histórico de conversão apagado com sucesso!")
  }
}