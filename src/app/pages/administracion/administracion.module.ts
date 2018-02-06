import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AdministracionRoutingModule, routedComponents } from './administracion-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        AdministracionRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class AdministracionModule { }
