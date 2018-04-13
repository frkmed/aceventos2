import { Component, OnInit } from '@angular/core';
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
    public selectedValue: any = null;
    objCliente = new Cliente(0,'','','','','',0,0,0,'','',0,0,'');

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
        this.loadClientes();
        this.loadPaises();
        this.loadProvincias();
        this.loadLocalidades();
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
        this.selectedValue = item;
    }


    getEstado(event):void {
        console.log(event.codigo);
        if(event.codigo == 0) {
            this.index();
        }
    }

    changeStatus() {
        this.inicializarMensajeria();
        if(this.selectedValue == null) {
            this.message = true;
            this.showToast("warning", "Advertencia", "Debe seleccionar un registro");
        } else {
            let cn: any;
            cn = this.dbConnectService.post('cliente', 'updateStatus', {
                id: this.selectedValue.id,
                estado_cliente_id: this.selectedValue.estado_cliente_id == 1 ? 2 : 1
            }).subscribe(response => {
                this._get.subscribe((data) => {
                    this.showToast("success", "Exito", "Los datos se guardaron con exito");
                    this.clientes = data;
                    this.selectedValue = null;
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
        this.objCliente = new Cliente(
            this.selectedValue.id,
            this.selectedValue.apellido,
            this.selectedValue.nombre,
            this.selectedValue.telefono,
            this.selectedValue.direccion,
            this.selectedValue.codigo_postal,
            this.selectedValue.pais_id,
            this.selectedValue.provincia_id,
            this.selectedValue.localidad_id,
            this.selectedValue.contacto,
            this.selectedValue.mail,
            this.selectedValue.estado_cliente_id,
            this.selectedValue.empresa_id,
            this.selectedValue.cuil
        );
    }

    index() {
        this.inicializarMensajeria();
        this.showIndex = true;
        this.showPanel = false;
    }

}
