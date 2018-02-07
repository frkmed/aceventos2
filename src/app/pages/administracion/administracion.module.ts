import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AdministracionRoutingModule, routedComponents } from './administracion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
    imports: [
        ThemeModule,
        AdministracionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        SmartTableService,
    ]
})
export class AdministracionModule { }
