import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";



@Component({
    selector: 'ngx-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss'],
})

export class EmpresasComponent implements OnInit {

    //ARREGLOS
    public empresas: Array<any> = [];
    public paises: Array<any> = [];
    public provincias: Array<any> = [];
    public localidades: Array<any> = [];

    //VARIABLES
    public showIndex: boolean = true;
    public showPanel: boolean = false;
    selectedValue = null;
    public alert: any;
    public message: boolean = false;

    public id: number = 0;
    public nombre: string = '';
    public direccion: string = '';
    public codigo_postal: string = '';
    public pais_id: number = 1;
    public provincia_id: number = 1;
    public localidad_id: number = 1;
    public cuit: string = '';
    public telefono: number = 0;
    public contacto: string = '';
    public mail: string = '';
    public web: string = '';
    public detalle: string = '';
    public estado_empresa_id: number = 1;

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
            nombre: {
                title: 'Empresa',
                type: 'string',
            },
            direccion: {
                title: 'Direccion',
                type: 'string',
            },
            telefono: {
                title: 'Telefono',
                type: 'string',
            },
            contacto: {
                title: 'Contacto',
                type: 'string',
            }
        },
    };

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {

    }

    ngOnInit() {
        this.loadEmpresas();
        this.loadPaises();
        this.loadProvincias();
        this.loadLocalidades();

        this.formContainer = this.buildForm(this.formContainer);
    }

    loadEmpresas():void {
        this._get = this.dbConnectService.get('empresa', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.empresas = data;
        });
    }

    loadPaises():void {
        this._getPa = this.dbConnectService.get('pais', 'getPaises', {});

        this._getPa.subscribe((data) => {
            console.log(data);
            this.paises = data;
        });
    }

    loadProvincias():void {
        this._getPro = this.dbConnectService.get('pais', 'getProvincias', {});

        this._getPro.subscribe((data) => {
            console.log(data);
            this.provincias = data;
        });
    }

    loadLocalidades():void {
        this._getLoc = this.dbConnectService.get('pais', 'getLocalidades', {});

        this._getLoc.subscribe((data) => {
            console.log(data);
            this.localidades = data;
        });
    }


    onRowSelect(event): void {
        console.log(event.data);
        this.id = event.data.id;
        this.selectedValue = event.data;
        this.pais_id = event.data.pais_id;
        this.provincia_id = event.data.provincia_id;
        this.localidad_id = event.data.localidad_id;
        this.formContainer.setValue({
            nombre: event.data.nombre,
            direccion: event.data.direccion,
            codigo_postal: event.data.codigo_postal,
            cuit: event.data.cuit,
            telefono: event.data.telefono,
            contacto: event.data.contacto,
            mail: event.data.mail,
            web: event.data.web,
            detalle: event.data.detalle,
            estado_empresa_id: event.data.estado_empresa_id
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
        cn = this.dbConnectService.post('empresa', 'create', {
            nombre: this.formContainer.get('nombre').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            cuit: this.formContainer.get('cuit').value,
            telefono: this.formContainer.get('telefono').value,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            web: this.formContainer.get('web').value,
            detalle: this.formContainer.get('detalle').value,
            estado_empresa_id: this.formContainer.get('estado_empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.empresas = data;
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
            });
        });
    }

    update() {
        let cn: any;
        cn = this.dbConnectService.post('empresa', 'update', {
            id: this.id,
            nombre: this.formContainer.get('nombre').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            cuit: this.formContainer.get('cuit').value,
            telefono: this.formContainer.get('telefono').value,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            web: this.formContainer.get('web').value,
            detalle: this.formContainer.get('detalle').value,
            estado_empresa_id: this.formContainer.get('estado_empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.empresas = data;
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
            });
        })
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
            this.alert = {type: 'warning', message: 'Debe seleccionar un registro'};
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
            'direccion': [this.direccion, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'codigo_postal': this.codigo_postal,
            'cuit': this.cuit,
            'telefono': this.telefono,
            'contacto': this.contacto,
            'mail': this.mail,
            'web': this.web,
            'detalle': this.detalle,
            'estado_empresa_id': this.estado_empresa_id
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    formErrors = {
        'nombre': '',
        'direccion': ''
    };
    validationMessages = {
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
