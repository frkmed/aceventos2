import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { PrincipalComponent } from './principal.component';



@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
    ],
    declarations: [
        PrincipalComponent
    ],
})
export class PrincipalModule { }
