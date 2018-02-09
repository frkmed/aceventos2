import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";



@Component({
    selector: 'ngx-salones',
    templateUrl: './salones.component.html',
    styleUrls: ['./salones.component.scss'],
})

export class SalonesComponent implements OnInit {

    //ARREGLOS
    public salones: Array<any> = [];
    public alert: any;
    public message: boolean = false;

    //VARIABLES
    public showIndex: boolean = true;
    public showPanel: boolean = false;
    selectedValue = null;

    public id: number = 0;
    public nombre: string = '';
    public telefono: number = 0;
    public direccion: string = '';
    public cantidad_personas: number = 0;
    public estado: number = 0;
    public ancho: number = 0;
    public alto: number = 0;
    public detalle: string = '';
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
            nombre: {
                title: 'Nombre',
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
            cantidad_personas: {
                title: 'Cant Personas',
                type: 'number',
            }
        },
    };

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {

    }

    ngOnInit() {
        this.loadSalones();

        this.formContainer = this.buildForm(this.formContainer);
    }

    loadSalones():void {
        this._get = this.dbConnectService.get('salon', 'get', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.salones = data;
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
        cn = this.dbConnectService.post('salon', 'create', {
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            cantidad_personas: this.formContainer.get('cantidad_personas').value,
            estado: this.formContainer.get('estado').value,
            ancho: this.formContainer.get('ancho').value,
            alto: this.formContainer.get('alto').value,
            detalle: this.formContainer.get('detalle').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.salones = data;
                this.id = 0;
                this.index();
            }, err => {
                console.log(err);
            });
        });
    }

    update() {
        let cn: any;
        cn = this.dbConnectService.post('salon', 'update', {
            id: this.id,
            nombre: this.formContainer.get('nombre').value,
            telefono: this.formContainer.get('telefono').value,
            direccion: this.formContainer.get('direccion').value,
            cantidad_personas: this.formContainer.get('cantidad_personas').value,
            estado: this.formContainer.get('estado').value,
            ancho: this.formContainer.get('ancho').value,
            alto: this.formContainer.get('alto').value,
            detalle: this.formContainer.get('detalle').value,
            empresa_id: this.formContainer.get('empresa_id').value
        }).subscribe(response => {
            this._get.subscribe((data) => {
                this.salones = data;
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
            'telefono': this.telefono,
            'cantidad_personas': this.cantidad_personas,
            'estado': this.estado,
            'ancho': this.ancho,
            'alto': this.alto,
            'detalle': this.detalle,
            'empresa_id': this.empresa_id
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
            'minlength': 'MÃ­nimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 150 letras'
        },
        'direccion': {
            'required': 'Requerido',
            'minlength': 'MÃ­nimo 3 letras',
            'maxlength': 'La direcciÃ³n no puede tener mas de 150 letras'
        }
    };


    onRowSelect(event): void {
        console.log(event.data);
        this.id = event.data.id;
        this.selectedValue = event.data;
        this.formContainer.setValue({
            nombre: event.data.nombre,
            telefono: event.data.telefono,
            direccion: event.data.direccion,
            cantidad_personas: event.data.cantidad_personas,
            estado: event.data.estado,
            ancho: event.data.ancho,
            alto: event.data.alto,
            detalle: event.data.detalle,
            empresa_id: event.data.empresa_id
        });
    }

}
