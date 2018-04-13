import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { Cliente } from '../../Domain/cliente';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
    selector: 'admin-cliente',
    templateUrl: './admin-cliente.component.html',
    styleUrls: ['./clientes.component.scss'],
})

export class AdminClienteComponent implements OnInit, OnChanges  {

    @Input() cliente: Cliente;
    @Output() Estado = new EventEmitter();

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

    allMsgChangeLogs: string[] = [];
    allEmployeeChangeLogs: string[] = [];

    formContainer: FormGroup;
    private fb: FormBuilder;

    //METODOS
    private _get;
    private _getPa;
    private _getPro;
    private _getLoc;



    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private toasterService: ToasterService) {

    }

    ngOnInit() {
        this.loadClientes();
        this.loadPaises();
        this.loadProvincias();
        this.loadLocalidades();

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

/*
    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];

            let curVal  = JSON.stringify(change.currentValue);
            let prevVal = JSON.stringify(change.previousValue);
            let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;

             if (propName === '') {
                this.allMsgChangeLogs.push(changeLog);
             } else if (propName === 'cliente') {
                this.allEmployeeChangeLogs.push(changeLog);
             }
        }

        console.log(this.allMsgChangeLogs);
        console.log(this.allEmployeeChangeLogs);
    }
  */

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];
            console.log(change);

            this.id = change.currentValue.id;
            this.apellido = change.currentValue.apellido;
            this.nombre = change.currentValue.nombre;
            this.telefono = change.currentValue.telefono;
            this.direccion = change.currentValue.direccion;
            this.codigo_postal = change.currentValue.codigo_posta;
            this.pais_id = change.currentValue.pais_id;
            this.provincia_id = change.currentValue.provincia_id;
            this.localidad_id = change.currentValue.localidad_id;
            this.contacto = change.currentValue.contacto;
            this.mail = change.currentValue.mail;
            this.estado_cliente_id = change.currentValue.estado_cliente_id;
            this.cuil = change.currentValue.cuil;
            this.empresa_id = change.currentValue.empresa_id;
        }
    }

    loadClientes():void {
        this._get = this.dbConnectService.get('cliente', 'get', {});

        this._get.subscribe((data) => {
            //console.log(data);
            this.clientes = data;
        });
    }

    loadPaises():void {
        this._getPa = this.dbConnectService.get('pais', 'getPaises', {});

        this._getPa.subscribe((data) => {
            this.paises = data;
        });
    }

    loadProvincias():void {
        this._getPro = this.dbConnectService.get('pais', 'getProvincias', {});

        this._getPro.subscribe((data) => {
            this.provincias = data;
        });
    }

    loadLocalidades():void {
        this._getLoc = this.dbConnectService.get('pais', 'getLocalidades', {});

        this._getLoc.subscribe((data) => {
            this.localidades = data;
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
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.clientes = data;
                this.selectedValue = null;
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
                this.showToast("success", "Exito", "Los datos se guardaron con exito");
                this.clientes = data;
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


    onCancel(event) {
        this.Estado.emit({codigo: 0});
    }

}
