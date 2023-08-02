import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        HomeComponent
    ],

    imports: [
        CommonModule,
        FooterModule,
    ]

})
export class HomeModule { }
