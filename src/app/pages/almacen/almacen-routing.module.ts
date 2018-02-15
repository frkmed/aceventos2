import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlmacenComponent } from './almacen.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
//import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

const routes: Routes = [{
    path: '',
    component: AlmacenComponent,
    children: [{
        path: 'proveedores',
        component: ProveedoresComponent,
    },  {
        path: 'productos',
        component: ProductosComponent,
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
export class AlmacenRoutingModule {

}

export const routedComponents = [
    AlmacenComponent,
    ProveedoresComponent,
    ProductosComponent
];
