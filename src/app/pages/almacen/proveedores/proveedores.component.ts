import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
    selector: 'ngx-proveedores',
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.scss'],
})

export class ProveedoresComponent implements OnInit {

    //ARREGLOS
    public proveedores: Array<any> = [];
    public paises: Array<any> = [];
    public provincias: Array<any> = [];
    public localidades: Array<any> = [];
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
    public razon_social: string = '';
    public nombre: string = '';
    public telefono: number = 0;
    public direccion: string = '';
    public codigo_postal: string = '';
    public pais_id: number = 1;
    public provincia_id: number = 1;
    public localidad_id: number = 1;
    public contacto: string = '';
    public mail: string = '';
    public estado: number = 1;
    public empresa_id: number = 1;
    public cuit: string = '';
    public nota: string = '';

    formContainer: FormGroup;
    private fb: FormBuilder;

    //METODOS
    private _get;
    private _getPa;
    private _getPro;
    private _getLoc;

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
        this.loadPaises();
        //this.loadProvincias();
        //this.loadLocalidades();

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
        this._get = this.dbConnectService.get('proveedor', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.proveedores = data;
        });
    }

    loadPaises():void {
        this._getPa = this.dbConnectService.get('pais', 'getPaises', {});

        this._getPa.subscribe((data) => {
            console.log(data);
            this.paises = data;
            this.loadProvincias(data[0].id);
        });
    }

    loadProvincias(pais_id):void {
        //this._getPro = this.dbConnectService.get('pais', 'getProvincias', {});
        this._getPro = this.dbConnectService.get('pais', 'getProvinciasByPais', {pais_id: pais_id});

        this._getPro.subscribe((data) => {
            console.log(data);
            this.provincias = data;
            this.loadLocalidades(data[0].id);
        });
    }

    loadLocalidades(provincia_id):void {
        this._getLoc = this.dbConnectService.get('pais', 'getLocalidadesByProvincia', {provincia_id: provincia_id});

        this._getLoc.subscribe((data) => {
            console.log(data);
            this.localidades = data;
        });
    }

    onChangePais(event):void {
        console.log(event);
        this.loadProvincias(event);
    }

    onChangeProvincia(event): void {
        console.log(event);
        this.loadLocalidades(event);
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
        this.selectedValue = item;
        this.pais_id = item.pais_id;
        this.provincia_id = item.provincia_id;
        this.localidad_id = item.localidad_id;
        this.formContainer.setValue({
            razon_social: item.razon_social,
            nombre: item.nombre,
            telefono: item.telefono,
            direccion: item.direccion,
            codigo_postal: item.codigo_postal,
            contacto: item.contacto,
            mail: item.mail,
            cuit: item.cuit,
            nota: item.nota
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
        let cn: any;
        cn = this.dbConnectService.post('proveedor', 'create', {
            razon_social: this.formContainer.get('razon_social').value,
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            estado: 1,
            cuit: this.formContainer.get('cuit').value,
            nota: this.formContainer.get('nota').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.proveedores = data;
                this.selectedValue = null;
                this.formContainer.reset();
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
                this.showToast("error", "Error", err);
            });
        });
    }

    update() {
        let cn: any;
        cn = this.dbConnectService.post('proveedor', 'update', {
            id: this.id,
            razon_social: this.formContainer.get('razon_social').value,
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            estado: this.selectedValue.estado,
            cuit: this.formContainer.get('cuit').value,
            nota: this.formContainer.get('nota').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.proveedores = data;
                this.selectedValue = null;
                this.formContainer.reset();
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
                this.showToast("error", "Error", err);
            });
        })
    }

    changeStatus() {
        this.inicializarMensajeria();
        if(this.selectedValue == null) {
            this.message = true;
            this.showToast("warning", "Advertencia", "Debe seleccionar un registro");
        } else {
            let cn: any;
            cn = this.dbConnectService.post('proveedor', 'updateStatus', {
                id: this.id,
                estado: this.selectedValue.estado == 1 ? 2 : 1
            }).subscribe(response => {
                this._get.subscribe((data) => {
                    this.showToast("success", "Exito", "Los datos se guardaron con exito");
                    this.proveedores = data;
                    this.selectedValue = null;
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
            'razon_social': [this.razon_social, [Validators.required]],
            'nombre': [this.nombre, [Validators.required]],
            'direccion': [this.direccion, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'codigo_postal': this.codigo_postal,
            'telefono': this.telefono,
            'contacto': this.contacto,
            'mail': this.mail,
            'cuit': this.cuit,
            'nota': this.nota
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);


        return form;
    }

    formErrors = {
        'razon_social': '',
        'nombre': '',
        'direccion': ''
    };
    validationMessages = {
        'razon_social': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El apellido no puede tener mas de 150 letras'
        },
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 150 letras'
        },
        'direccion': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'La dirección no puede tener mas de 150 letras'
        }
    };



}
