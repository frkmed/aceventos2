import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { Cliente, Evento } from '../../Domain/cliente';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
    selector: 'ngx-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})

export class EventosComponent implements OnInit {

    //ARREGLOS
    public eventos: Array<any> = [];
    public salones: Array<any> = [];
    public clientes: Array<any> = [];
    public tipo_eventos: Array<any> = [];
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
    objEvento = new Evento(0,'',0,0,0,'','',0,0,'',0);

    public tipoEvento: string = '';

    //METODOS
    private _get;
    private _getTipoEvento;
    private _getSalon;
    private _getCliente;


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
                title: 'Evento',
                type: 'string',
            },
            tipo_evento_id: {
                title: 'Tipo Evento',
                type: 'string',
            },
            invitados: {
                title: 'Invitados',
                type: 'number',
            },
            estado_evento_id: {
                title: 'Estado',
                type: 'number',
            }
        },
    };

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private toasterService: ToasterService) {

    }

    ngOnInit() {
        this.loadTipoEventos();
        this.loadClientes();
        this.loadSalones();
        this.loadEventos();
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

    loadEventos():void {
        this._get = this.dbConnectService.get('evento', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.eventos = data;
        });
    }

    loadTipoEventos():void {
        this._getTipoEvento = this.dbConnectService.get('evento', 'getTipoEventos', {});

        this._getTipoEvento.subscribe((data) => {
            console.log(data);
            this.tipo_eventos = data;
        });
    }

    loadClientes(): void {
        this._getCliente = this.dbConnectService.get('cliente', 'get', {});

        this._getCliente.subscribe((data) => {
            console.log(data);
            this.clientes = data;
        });
    }

    loadSalones(): void {
        this._getSalon = this.dbConnectService.get('salon', 'get', {});

        this._getSalon.subscribe((data) => {
            console.log(data);
            this.salones = data;
        });
    }

    getTipoEvento(tipo_evento_id): string {
        this.tipoEvento = '';
        this.tipo_eventos.forEach(item => {
            if(tipo_evento_id == item.id) {
                this.tipoEvento = item.nombre;
                return this.tipoEvento;
            }
        });
        return this.tipoEvento;
    }


    onRowSelect(event): void {
        console.log(event.data);
        this.selectedValue = event.data;
    }

    getEstado(event):void {
        console.log(event.codigo);
        if(event.codigo == 0) {
            this.index();
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
            this.alert = {type: 'warning', message: 'Debe seleccionar un registro'};
        } else {
            this.showIndex = false;
            this.showPanel = true;
        }

        this.objEvento = new Evento(
            this.selectedValue.id,
            this.selectedValue.nombre,
            this.selectedValue.tipo_evento_id,
            this.selectedValue.estado_evento_id,
            this.selectedValue.cliente_id,
            this.selectedValue.fecha_pedido,
            this.selectedValue.fecha_evento,
            this.selectedValue.invitados,
            this.selectedValue.salon_id,
            this.selectedValue.detalle,
            this.selectedValue.empresa_id
        );
    }

    index() {
        this.inicializarMensajeria();
        this.showIndex = true;
        this.showPanel = false;
    }



}
