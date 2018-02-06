import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { LoginRoutingModule, routedComponents } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ThemeModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class LoginModule { }
