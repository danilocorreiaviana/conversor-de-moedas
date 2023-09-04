import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import HistoryInterface from '../interfaces/coin-history-interface/Icoin-history';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-coin-history',
  templateUrl: './coin-history.component.html',
  styleUrls: ['./coin-history.component.css']
})
export class CoinHistoryComponent implements OnInit, AfterViewInit {
  title = 'Histórico de Conversões';
  history: HistoryInterface[] = [];
  historyDelete: boolean = false;
  conversionDelete: boolean = false;

  dataSource!: MatTableDataSource<HistoryInterface>;

  displayedColumns: string[] = ['date', 'time', 'input', 'originCurrency', 'destinyCurrency', 'output', 'rate', 'action'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obterHistorico();
  }

  ngAfterViewInit(): void {
    this.obterHistorico();
  }

  obterHistorico() {
    const historyData = this.getData('historico_info');
    if (Array.isArray(historyData)) {
      this.history = historyData;
      this.dataSource = new MatTableDataSource(this.history);
      this.dataSource.sort = this.sort;
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
    this.obterHistorico();
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