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
    selector: 'ngx-platos',
    templateUrl: './platos.component.html',
    styleUrls: ['./platos.component.scss'],
})

export class PlatosComponent implements OnInit {

    //ARREGLOS
    public platos: Array<any> = [];
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
    public cantidad_personas: number = 0;
    public guarnicion: string = '';
    public detalle: string = '';
    public costo_plato: number = 0;
    public margen_ganancia: number = 0;
    public estado: number = 1;
    public empresa_id: number = 1;

    formContainer: FormGroup;
    private fb: FormBuilder;

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
        this.loadPlatos();

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

    loadPlatos():void {
        this._get = this.dbConnectService.get('plato', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.platos = data;
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
        this.selectedValue = item;
        this.formContainer.setValue({
            nombre: item.nombre,
            guarnicion: item.guarnicion,
            cantidad_personas: item.cantidad_personas,
            detalle: item.detalle,
            costo_plato: item.costo_plato,
            margen_ganancia: item.margen_ganancia,
            empresa_id: item.empresa_id
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
        cn = this.dbConnectService.post('plato', 'create', {
            nombre: this.formContainer.get('nombre').value,
            guarnicion: this.formContainer.get('guarnicion').value,
            cantidad_personas: this.formContainer.get('cantidad_personas').value,
            detalle: this.formContainer.get('detalle').value,
            costo_plato: this.formContainer.get('costo_plato').value,
            margen_ganancia: this.formContainer.get('margen_ganancia').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.platos = data;
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
        cn = this.dbConnectService.post('plato', 'update', {
            id: this.id,
            nombre: this.formContainer.get('nombre').value,
            guarnicion: this.formContainer.get('guarnicion').value,
            cantidad_personas: this.formContainer.get('cantidad_personas').value,
            detalle: this.formContainer.get('detalle').value,
            costo_plato: this.formContainer.get('costo_plato').value,
            margen_ganancia: this.formContainer.get('margen_ganancia').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.platos = data;
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
            cn = this.dbConnectService.post('cliente', 'updateStatus', {
                id: this.id,
                estado_cliente_id: this.selectedValue.estado_cliente_id == 1 ? 2 : 1
            }).subscribe(response => {
                this._get.subscribe((data) => {
                    this.showToast("success", "Exito", "Los datos se guardaron con exito");
                    this.platos = data;
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
            'guarnicion': [this.guarnicion, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'cantidad_personas': this.cantidad_personas,
            'detalle': this.detalle,
            'costo_plato': this.costo_plato,
            'margen_ganancia': this.margen_ganancia,
            'empresa_id': this.empresa_id
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);


        return form;
    }

    formErrors = {
        'nombre': '',
        'guarnicion': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 150 letras'
        },
        'guarnicion': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'La dirección no puede tener mas de 150 letras'
        }
    };



}
