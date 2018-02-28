import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';


@NgModule({
    declarations: [
        UploadComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    providers: [],
    exports: [
        UploadComponent,
    ]
})
export class SharedModule {
}
