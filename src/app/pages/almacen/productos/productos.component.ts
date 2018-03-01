import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { ViewChild } from '@angular/core';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
    selector: 'ngx-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
})

export class ProductosComponent implements OnInit {

    //ARREGLOS
    public productos: Array<any> = [];
    public alert: any;
    public message: boolean = false;

    //TOASTER
    config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    title = '';
    content = ``;
    timeout = 5000;
    toastsLimit = 5;
    type = 'default';

    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    //VARIABLES
    public showIndex: boolean = true;
    public showPanel: boolean = false;
    selectedValue = null;

    public id: number = 0;
    public nombre: string = '';
    public descripcion: string = '';
    public pto_repo: number = 0;
    public sku: string = '';
    public status: number = 0;
    public vendidos: number = 0;
    public destacado: number = 0;
    public en_slider: number = 0;
    public en_oferta: number = 0;
    public producto_tipo_id: number = 0;
    public iva: number = 0;
    public tiempo_espera: number = 0;
    public empresa_id: number = 1;
    public foto: string = '';

    formContainer: FormGroup;
    private fb: FormBuilder;


    @ViewChild('foto_uploader') foto_uploader;

    //METODOS
    private _get;

    settings = {
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [],
            position: 'left',
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            apellido: {
                title: 'Apellido',
                type: 'string',
            },
            nombre: {
                title: 'Nombre',
                type: 'string',
            },
            direccion: {
                title: 'direccion',
                type: 'string',
            },
            telefono: {
                title: 'Telefono',
                type: 'number',
            }
        },
    };

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private toasterService: ToasterService) {

    }

    ngOnInit() {
        this.loadProveedores();

        this.formContainer = this.buildForm(this.formContainer);
    }

    private showToast(type: string, title: string, body: string) {
        this.config = new ToasterConfig({
            positionClass: this.position,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
        });
        const toast: Toast = {
            type: type,
            title: title,
            body: body,
            timeout: this.timeout,
            showCloseButton: this.isCloseButton,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
    }

    loadProveedores():void {
        this._get = this.dbConnectService.get('producto', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.productos = data;
        });
    }

    /*
     onRowSelect(event): void {
     console.log(event.data);
     this.id = event.data.id;
     this.selectedValue = event.data;
     this.pais_id = event.data.pais_id;
     this.provincia_id = event.data.provincia_id;
     this.localidad_id = event.data.localidad_id;
     this.formContainer.setValue({
     apellido: event.data.apellido,
     nombre: event.data.nombre,
     telefono: event.data.telefono,
     direccion: event.data.direccion,
     codigo_postal: event.data.codigo_postal,
     contacto: event.data.contacto,
     mail: event.data.mail,
     estado_cliente_id: event.data.estado_cliente_id,
     empresa_id: event.data.empresa_id,
     cuil: event.data.cuil
     });
     }
     */
    onRowSelect(item): void {
        this.id = item.id;
        this.foto = item.foto;
        this.selectedValue = item;
        this.formContainer.setValue({
            nombre: item.nombre,
            descripcion: item.descripcion,
            pto_repo: item.pto_repo,
            sku: item.sku,
            status: item.status,
            vendidos: item.vendidos,
            destacado: item.destacado,
            en_slider: item.en_slider,
            en_oferta: item.en_oferta,
            producto_tipo_id: item.producto_tipo_id,
            iva: item.iva,
            tiempo_espera: item.tiempo_espera
        });
    }

    save() {
        if (this.id != 0) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.foto_uploader.onSubmit();

        let cn: any;
        this.foto_uploader.status.subscribe((data) => {
            console.log(data.status);
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('producto', 'create', {
                    nombre: this.formContainer.get('nombre').value,
                    descripcion: this.formContainer.get('descripcion').value,
                    pto_repo: this.formContainer.get('pto_repo').value,
                    sku: this.formContainer.get('sku').value,
                    status: this.formContainer.get('status').value,
                    vendidos: this.formContainer.get('vendidos').value,
                    destacado: this.formContainer.get('destacado').value,
                    en_slider: this.formContainer.get('en_slider').value,
                    en_oferta: this.formContainer.get('en_oferta').value,
                    producto_tipo_id: this.formContainer.get('producto_tipo_id').value,
                    iva: this.formContainer.get('iva').value,
                    tiempo_espera: this.formContainer.get('tiempo_espera').value,
                    foto: this.foto
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.showToast("success", "Exito", "Los datos se guardaron con exito");
                        this.productos = data;
                        this.selectedValue = null;
                        this.formContainer.reset();
                        this.foto = '';
                        this.id = 0;
                        this.index();
                    }, err => {
                        console.log(err);
                        this.showToast("error", "Error", err);
                    });
                });
            }
        });

    }

    update() {
        this.foto_uploader.onSubmit();

        let cn: any;
        this.foto_uploader.status.subscribe((data) => {

            if (data.status == 200) {
                this.foto = data.originalName;

                cn = this.dbConnectService.post('producto', 'update', {
                    id: this.id,
                    nombre: this.formContainer.get('nombre').value,
                    descripcion: this.formContainer.get('descripcion').value,
                    pto_repo: this.formContainer.get('pto_repo').value,
                    sku: this.formContainer.get('sku').value,
                    status: this.formContainer.get('status').value,
                    vendidos: this.formContainer.get('vendidos').value,
                    destacado: this.formContainer.get('destacado').value,
                    en_slider: this.formContainer.get('en_slider').value,
                    en_oferta: this.formContainer.get('en_oferta').value,
                    producto_tipo_id: this.formContainer.get('producto_tipo_id').value,
                    iva: this.formContainer.get('iva').value,
                    tiempo_espera: this.formContainer.get('tiempo_espera').value,
                    foto: this.foto
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.showToast("success", "Exito", "Los datos se guardaron con exito");
                        this.productos = data;
                        this.selectedValue = null;
                        this.formContainer.reset();
                        this.foto = '';
                        this.id = 0;
                        this.index();
                    }, err => {
                        console.log(err);
                        this.showToast("error", "Error", err);
                    });
                })
            }

        });

    }

    changeStatus() {
        this.inicializarMensajeria();
        if(this.selectedValue == null) {
            this.message = true;
            this.showToast("warning", "Advertencia", "Debe seleccionar un registro");
        } else {
            let cn: any;
            cn = this.dbConnectService.post('producto', 'updateStatus', {
                id: this.id,
                status: this.selectedValue.status == 1 ? 2 : 1
            }).subscribe(response => {
                this._get.subscribe((data) => {
                    this.showToast("success", "Exito", "Los datos se guardaron con exito");
                    this.productos = data;
                    this.selectedValue = null;
                    this.foto = '';
                    this.id = 0;
                    this.index();
                }, err => {
                    console.log(err);
                    this.showToast("error", "Error", err);
                });
            })
        }
    }

    inicializarMensajeria() {
        this.message = false;
        this.alert = {type: 'success', message: ''};
    }

    crear() {
        this.inicializarMensajeria();
        this.showIndex = false;
        this.showPanel = true;
        this.selectedValue = null;
        this.formContainer.reset();
        this.id = 0;
    }

    modificar() {
        this.inicializarMensajeria();
        if(this.selectedValue == null) {
            this.message = true;
            //this.alert = {type: 'warning', message: 'Debe seleccionar un registro'};
            this.showToast("warning", "Advertencia", "Debe seleccionar un registro");
        } else {
            this.showIndex = false;
            this.showPanel = true;
        }
    }

    index() {
        this.inicializarMensajeria();
        this.showIndex = true;
        this.showPanel = false;
    }

    buildForm(form: FormGroup): FormGroup {
        this.fb = new FormBuilder();
        form = this.fb.group({
            'nombre': [this.nombre, [Validators.required]],
            'descripcion': [this.descripcion, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'pto_repo': this.pto_repo,
            'sku': this.sku,
            'status': this.status,
            'vendidos': this.vendidos,
            'destacado': this.destacado,
            'en_slider': this.en_slider,
            'en_oferta': this.en_oferta,
            'producto_tipo_id': this.producto_tipo_id,
            'iva': this.iva,
            'tiempo_espera': this.tiempo_espera
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);


        return form;
    }

    formErrors = {
        'nombre': '',
        'descripcion': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 150 letras'
        },
        'descripcion': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'La dirección no puede tener mas de 150 letras'
        }
    };



}
