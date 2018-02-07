import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

@Component({
    selector: 'ngx-eventos',
    styleUrls: ['./eventos.component.scss'],
    templateUrl: './eventos.component.html',
})
export class EventosComponent implements OnInit {

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

    formContainer: FormGroup;
    private fb: FormBuilder;

    //METODOS
    private _get;
    private _getTipoEvento;
    private _getSalon;
    private _getCliente;

    settings = {
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

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {

    }

    ngOnInit() {
        this.loadEventos();
        this.loadTipoEventos();
        this.loadClientes();
        this.loadSalones();

        this.formContainer = this.buildForm(this.formContainer);
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

    select(row) {
        console.log(row);
        this.id = row.id;
        this.selectedValue = row;
        this.formContainer.setValue({
            nombre: row.nombre,
            tipo_evento_id: row.tipo_evento_id,
            estado_evento_id: row.estado_evento_id,
            cliente_id: row.cliente_id,
            fecha_pedido: row.fecha_pedido,
            fecha_evento: row.fecha_evento,
            invitados: row.invitados,
            salon_id: row.salon_id,
            detalle: row.detalle,
            empresa_id: row.empresa_id
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

}
