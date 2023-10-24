import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Coin } from '../interfaces/coin-list-interface/Icoin-list';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css'],
})
export class CoinListComponent implements AfterViewInit {
  title = 'Listagem de Moedas';
  coinList: Coin[] = [];
  busca: string = '';
  loading: boolean = true;
  msgError: boolean = false;

  dataSource!: MatTableDataSource<Coin>;

  displayedColumns: string[] = ['code', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinService: CoinListService, private matPaginatorIntl: MatPaginatorIntl) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Itens por página:';
    this.matPaginatorIntl.nextPageLabel = 'Próxima página';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
    this.matPaginatorIntl.firstPageLabel = 'Primeira página';
    this.matPaginatorIntl.lastPageLabel = 'Última página';
  }

  ngAfterViewInit(): void {
    this.carregarCoinList()
  }

  carregarCoinList() {
    this.coinService.getCoins().subscribe({

      next: (coins: Coin[]) => {
        this.coinList = coins;

      },
      error: (error: Error) => {
        console.log(error);
        this.msgError = true;
      },
      complete: () => {
        this.loading = false;
        this.msgError = false;
        this.dataSource = new MatTableDataSource(this.coinList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  limparBusca() {
    this.busca = '';
    this.dataSource.filter = this.busca.trim();
  }

  buscarCoins(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.busca = filterValue;
    this.dataSource.filter = this.busca.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
