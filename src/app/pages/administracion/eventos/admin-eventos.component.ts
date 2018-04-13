import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
    selector: 'admin-eventos',
    templateUrl: './admin-eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
})

export class AdminEventosComponent implements OnInit, OnChanges {

    @Input() cliente: Cliente;
    @Input() evento: Evento;
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
    public eventos: Array<any> = [];
    public salones: Array<any> = [];
    public clientes: Array<any> = [];
    public tipo_eventos: Array<any> = [];
    public alert: any;
    public message: boolean = false;

    //VARIABLES
    public showIndex: boolean = true;
    public showPanel: boolean = false;
    selectedValue = null;

    public id: number = 0;
    public nombre: string = '';
    public tipo_evento_id: number = 0;
    public estado_evento_id: number = 0;
    public cliente_id: number = 0;
    public fecha_pedido;
    public fecha_evento;
    public invitados: number = 0;
    public salon_id: number = 0;
    public detalle: string = '';
    public empresa_id: number = 1;
    public tipoEvento: string = '';

    formContainer: FormGroup;
    private fb: FormBuilder;

    //METODOS
    private _get;
    private _getTipoEvento;
    private _getSalon;
    private _getCliente;



    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private toasterService: ToasterService) {

    }

    ngOnInit() {
        this.loadTipoEventos();
        this.loadClientes();
        this.loadSalones();
        this.loadEventos();

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

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];
            console.log(change);

            this.id = change.currentValue.id;
            this.nombre = change.currentValue.nombre;
            this.tipo_evento_id = change.currentValue.tipo_evento_id;
            this.estado_evento_id = change.currentValue.estado_evento_id;
            this.cliente_id = change.currentValue.cliente_id;
            this.fecha_evento = change.currentValue.fecha_evento;
            this.fecha_pedido = change.currentValue.fecha_pedido;
            this.invitados = change.currentValue.invitados;
            this.salon_id = change.currentValue.salon_id;
            this.detalle = change.currentValue.detalle;
            this.tipoEvento = change.currentValue.tipoEvento;
            this.empresa_id = change.currentValue.empresa_id;
        }
    }

    loadEventos():void {
        this._get = this.dbConnectService.get('evento', 'get', {});

        this._get.subscribe((data) => {
            this.eventos = data;
        });
    }

    loadTipoEventos():void {
        this._getTipoEvento = this.dbConnectService.get('evento', 'getTipoEventos', {});

        this._getTipoEvento.subscribe((data) => {
            this.tipo_eventos = data;
        });
    }

    loadClientes(): void {
        this._getCliente = this.dbConnectService.get('cliente', 'get', {});

        this._getCliente.subscribe((data) => {
            this.clientes = data;
        });
    }

    loadSalones(): void {
        this._getSalon = this.dbConnectService.get('salon', 'get', {});

        this._getSalon.subscribe((data) => {
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


    save() {
        if (this.id != 0) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        let cn: any;
        cn = this.dbConnectService.post('evento', 'create', {
            nombre: this.formContainer.get('nombre').value,
            tipo_evento_id: this.formContainer.get('tipo_evento_id').value,
            estado_evento_id: this.formContainer.get('estado_evento_id').value,
            cliente_id: this.formContainer.get('cliente_id').value,
            fecha_pedido: this.formContainer.get('fecha_pedido').value,
            fecha_evento: this.formContainer.get('fecha_evento').value,
            invitados: this.formContainer.get('invitados').value,
            salon_id: this.formContainer.get('salon_id').value,
            detalle: this.formContainer.get('detalle').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.eventos = data;
                this.formContainer.reset();
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
            });
        });
    }

    update() {
        let cn: any;
        cn = this.dbConnectService.post('evento', 'update', {
            id: this.id,
            nombre: this.formContainer.get('nombre').value,
            tipo_evento_id: this.formContainer.get('tipo_evento_id').value,
            estado_evento_id: this.formContainer.get('estado_evento_id').value,
            cliente_id: this.formContainer.get('cliente_id').value,
            fecha_pedido: this.formContainer.get('fecha_pedido').value,
            fecha_evento: this.formContainer.get('fecha_evento').value,
            invitados: this.formContainer.get('invitados').value,
            salon_id: this.formContainer.get('salon_id').value,
            detalle: this.formContainer.get('detalle').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.eventos = data;
                this.formContainer.reset();
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
            'tipo_evento_id': this.tipo_evento_id,
            'estado_evento_id': this.estado_evento_id,
            'cliente_id': this.cliente_id,
            'fecha_pedido': this.fecha_pedido,
            'fecha_evento': this.fecha_evento,
            'invitados': this.invitados,
            'salon_id': this.salon_id,
            'detalle': this.detalle,
            'empresa_id': this.empresa_id
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);


        return form;
    }

    formErrors = {
        'nombre': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 150 letras'
        }
    };

    onCancel(event) {
        this.Estado.emit({codigo: 0});
    }

}
