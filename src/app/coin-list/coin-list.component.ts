import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Coin } from '../interfaces/coin-list-interface/Icoin-list';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  title = 'Listagem de Moedas';
  coinList: Coin[] = [];
  coinListCompleta: Coin[] = [];
  busca: string = '';
  loading = true;

  dataSource!: MatTableDataSource<Coin>;

  displayedColumns: string[] = ['code', 'description']; // Add more columns if needed

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinService: CoinListService, private matPaginatorIntl: MatPaginatorIntl) { this.matPaginatorIntl.itemsPerPageLabel = 'Itens por página:';}

  ngOnInit(): void {
    this.carregarCoinList();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.coinList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarCoinList() {
    this.coinService.getCoins().subscribe({
      next: (coins: Coin[]) => {
        this.coinListCompleta = coins;
        this.coinList = this.coinListCompleta.slice();

        this.dataSource = new MatTableDataSource(this.coinList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
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
