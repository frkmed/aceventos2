import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionComponent } from './administracion.component';
import { EventosComponent } from './eventos/eventos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpresasComponent } from './empresas/empresas.component';
//import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

const routes: Routes = [{
    path: '',
    component: AdministracionComponent,
    children: [{
        path: 'eventos',
        component: EventosComponent,
    },  {
        path: 'clientes',
        component: ClientesComponent,
    },  {
        path: 'empresas',
        component: EmpresasComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AdministracionRoutingModule {

}

export const routedComponents = [
    AdministracionComponent,
    EventosComponent,
    ClientesComponent,
    EmpresasComponent
];
