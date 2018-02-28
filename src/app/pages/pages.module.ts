import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { PrincipalModule } from './principal/principal.module';


const PAGES_COMPONENTS = [
  PagesComponent,

];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    PrincipalModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  exports: [

  ]
})
export class PagesModule {
}
