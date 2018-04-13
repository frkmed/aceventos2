import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AdministracionRoutingModule, routedComponents } from './administracion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ToasterModule } from 'angular2-toaster';

import {AdminClienteComponent} from './clientes/admin-cliente.component';
import {AdminEventosComponent} from './eventos/admin-eventos.component';

@NgModule({
    imports: [
        ThemeModule,
        AdministracionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ToasterModule,
        //AdminClienteComponent
    ],
    declarations: [
        ...routedComponents,
        AdminClienteComponent,
        AdminEventosComponent,
    ],
    providers: [
        SmartTableService,
    ],
    exports: [
        AdminClienteComponent,
        AdminEventosComponent,
    ]
})
export class AdministracionModule { }
