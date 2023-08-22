import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoinListComponent } from './coin-list.component';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { Coin } from '../interfaces/coin-list-interface/Icoin-list';
import { of } from 'rxjs';
import { AppModule } from '../app.module';

describe('CoinListComponent', () => {
    let component: CoinListComponent;
    let fixture: ComponentFixture<CoinListComponent>;
    let coinService: jasmine.SpyObj<CoinListService>;

    const mockCoinList: Coin[] = [
        { code: 'USD', description: 'US Dollar' },
        { code: 'EUR', description: 'Euro' },
    ];

    beforeEach(waitForAsync(() => {
        const coinServiceSpy = jasmine.createSpyObj('CoinListService', ['getCoins']);
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            declarations: [CoinListComponent],
            providers: [
                { provide: CoinListService, useValue: coinServiceSpy }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoinListComponent);
        component = fixture.componentInstance;
        coinService = TestBed.inject(CoinListService) as jasmine.SpyObj<CoinListService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load coins and display them', () => {
        coinService.getCoins.and.returnValue(of(mockCoinList));

        fixture.detectChanges();

        const coinRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
        expect(coinRows.length).toBe(mockCoinList.length);

        for (let i = 0; i < mockCoinList.length; i++) {
            const coinRow = coinRows[i];
            const coin = mockCoinList[i];

            const columns = coinRow.queryAll(By.css('td'));
            expect(columns[0].nativeElement.textContent).toContain(coin.code);
            expect(columns[1].nativeElement.textContent).toContain(coin.description);
        }
    });

});
