import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FooterComponent } from '../footer/footer.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent, FooterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the correct title', () => {
        const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');
        expect(titleElement.textContent).toContain('Conversor de Moedas');
    });

    it('should have the correct image source', () => {
        const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(imgElement.src).toContain('currency_converter.png');
    });

    it('should have the correct project description', () => {
        const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('p');
        expect(descriptionElement.textContent).toContain('Projeto de conversão de moedas para exemplificar o consumo de APIs.');
    });

    it('should have the correct API link', () => {
        const apiLinkElement: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        expect(apiLinkElement.href).toContain('https://exchangerate.host/');
    });

    it('should have the app-footer component', () => {
        const appFooterElement: HTMLElement = fixture.nativeElement.querySelector('app-footer');
        expect(appFooterElement).toBeTruthy();
    });
});
