import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";



@Component({
    selector: 'ngx-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
})

export class ClientesComponent implements OnInit {

    //ARREGLOS
    public clientes: Array<any> = [];
    public paises: Array<any> = [];
    public provincias: Array<any> = [];
    public localidades: Array<any> = [];
    public alert: any;
    public message: boolean = false;

    //VARIABLES
    public showIndex: boolean = true;
    public showPanel: boolean = false;
    selectedValue = null;

    public id: number = 0;
    public apellido: string = '';
    public nombre: string = '';
    public telefono: number = 0;
    public direccion: string = '';
    public codigo_postal: string = '';
    public pais_id: number = 1;
    public provincia_id: number = 1;
    public localidad_id: number = 1;
    public contacto: string = '';
    public mail: string = '';
    public estado_cliente_id: number = 1;
    public empresa_id: number = 1;
    public cuil: string = '';

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

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {

    }

    ngOnInit() {
        this.loadClientes();
        this.loadPaises();
        this.loadProvincias();
        this.loadLocalidades();

        this.formContainer = this.buildForm(this.formContainer);
    }

    loadClientes():void {
        this._get = this.dbConnectService.get('cliente', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.clientes = data;
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

    save() {
        if (this.id != 0) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        let cn: any;
        cn = this.dbConnectService.post('cliente', 'create', {
            apellido: this.formContainer.get('apellido').value,
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            estado_cliente_id: this.formContainer.get('estado_cliente_id').value,
            cuil: this.formContainer.get('cuil').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.clientes = data;
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
            });
        });
    }

    update() {
        let cn: any;
        cn = this.dbConnectService.post('cliente', 'update', {
            id: this.id,
            apellido: this.formContainer.get('apellido').value,
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            codigo_postal: this.formContainer.get('codigo_postal').value,
            pais_id: this.pais_id,
            provincia_id: this.provincia_id,
            localidad_id: this.localidad_id,
            contacto: this.formContainer.get('contacto').value,
            mail: this.formContainer.get('mail').value,
            estado_cliente_id: this.formContainer.get('estado_cliente_id').value,
            cuil: this.formContainer.get('cuil').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.clientes = data;
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
            'apellido': [this.apellido, [Validators.required]],
            'nombre': [this.nombre, [Validators.required]],
            'direccion': [this.direccion, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'codigo_postal': this.codigo_postal,
            'telefono': this.telefono,
            'contacto': this.contacto,
            'mail': this.mail,
            'estado_cliente_id': this.estado_cliente_id,
            'empresa_id': this.empresa_id,
            'cuil': this.cuil
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);


        return form;
    }

    formErrors = {
        'apellido': '',
        'nombre': '',
        'direccion': ''
    };
    validationMessages = {
        'apellido': {
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
