import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CoinHistoryComponent } from './coin-history.component';
import HistoryInterface from '../interfaces/coin-history-interface/Icoin-history';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('CoinHistoryComponent', () => {
    let component: CoinHistoryComponent;
    let fixture: ComponentFixture<CoinHistoryComponent>;
    let dialog: jasmine.SpyObj<MatDialog>;

    const mockHistory: HistoryInterface[] = [];

    beforeEach(waitForAsync(() => {
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        TestBed.configureTestingModule({
            declarations: [CoinHistoryComponent],
            imports: [
                MatIconModule
            ],
            providers: [
                { provide: MatDialog, useValue: dialogSpy }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoinHistoryComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockHistory));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load history and display them', () => {
        const historyRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
        expect(historyRows.length).toBe(mockHistory.length);
    });

    it('should call exibirDialogoExclusaoConversao when delete icon is clicked', () => {
        const deleteIcons = fixture.debugElement.queryAll(By.css('.delete'));
        expect(deleteIcons.length).toBe(mockHistory.length);

        for (let i = 0; i < deleteIcons.length; i++) {
            deleteIcons[i].nativeElement.click();
            expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
                data: 'Você tem certeza de que deseja remover esta conversão?'
            });
        }
    });

    it('should call exibirDialogoExclusaoTodo when "Limpar tudo" button is clicked', () => {
        const clearButton = fixture.debugElement.queryAll(By.css('.btn-danger'));
        expect(clearButton.length).toBe(mockHistory.length);

        for (let i = 0; i < clearButton.length; i++) {
            clearButton[i].nativeElement.click();
            expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
                data: 'Você tem certeza de que deseja remover todo o histórico?'
            });
        }

    });
});



