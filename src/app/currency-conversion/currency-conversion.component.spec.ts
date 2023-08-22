// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { CurrencyConversionComponent } from './currency-conversion.component';
// import { CurrencyConversionService } from '../service/currency-service/currency-conversion.service';
// import { CoinListService } from '../service/coin-list-service/coin-list.service';
// import { of } from 'rxjs';
// import { AppModule } from '../app.module';

// describe('CurrencyConversionComponent', () => {
//   let component: CurrencyConversionComponent;
//   let fixture: ComponentFixture<CurrencyConversionComponent>;
//   let currencyConversionServiceSpy: jasmine.SpyObj<CurrencyConversionService>;
//   let coinListServiceSpy: jasmine.SpyObj<CoinListService>;

//   beforeEach(async () => {
//     const spyCurrencyService = jasmine.createSpyObj('CurrencyConversionService', ['converter']);
//     const spyCoinListService = jasmine.createSpyObj('CoinListService', ['getCoins']);

//     await TestBed.configureTestingModule({
//       declarations: [CurrencyConversionComponent],
//       imports: [
//         AppModule
//       ],
//       providers: [
//         { provide: CurrencyConversionService, useValue: spyCurrencyService },
//         { provide: CoinListService, useValue: spyCoinListService },
//       ],
//     }).compileComponents();

//     currencyConversionServiceSpy = TestBed.inject(CurrencyConversionService) as jasmine.SpyObj<CurrencyConversionService>;
//     coinListServiceSpy = TestBed.inject(CoinListService) as jasmine.SpyObj<CoinListService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CurrencyConversionComponent);
//     component = fixture.componentInstance;
//     coinListServiceSpy.getCoins.and.returnValue(of([{ code: 'USD', description: 'United States Dollar' }]));
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load currencies', () => {
//     expect(component.moedas.length).toBeGreaterThan(0);
//   });

// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyConversionComponent } from './currency-conversion.component';
import { CoinListService } from '../service/coin-list-service/coin-list.service';
import { CurrencyConversionService } from '../service/currency-service/currency-conversion.service';
import { AppModule } from '../app.module';
import { of } from 'rxjs';

describe('CurrencyConversionComponent', () => {
  let component: CurrencyConversionComponent;
  let fixture: ComponentFixture<CurrencyConversionComponent>;
  let coinListService: CoinListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [CurrencyConversionComponent],
      providers: [CoinListService, CurrencyConversionService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionComponent);
    component = fixture.componentInstance;
    coinListService = TestBed.inject(CoinListService);
    spyOn(coinListService, 'getCoins').and.returnValue(of([{ code: 'USD', description: 'United States Dollar' }]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.formConverter.get('moedaOrigem')).toBeTruthy();
    expect(component.formConverter.get('moedaDestino')).toBeTruthy();
    expect(component.formConverter.get('valorConversao')).toBeTruthy();
  });

  it('should return the correct description for a valid currency code', () => {
    const code = 'USD';
    const description = component.getDescricao(code);
    expect(description).toBe('United States Dollar');
  });

  it('should return an empty string for an invalid currency code', () => {
    const code = 'XYZ';
    const description = component.getDescricao(code);
    expect(description).toBe('');
  });

  it('should load the coins correctly', () => {
    component.carregarMoedas();
    expect(component.moedas.length).toBeGreaterThan(0);
  });

});
