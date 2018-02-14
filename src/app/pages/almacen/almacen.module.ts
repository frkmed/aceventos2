import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AlmacenRoutingModule, routedComponents } from './almacen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
    imports: [
        ThemeModule,
        AlmacenRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ToasterModule,
    ],
    declarations: [
...routedComponents,
],
providers: [
    SmartTableService,
]
})
export class AlmacenModule { }
