import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/auth/authentication.service";
import { CoreService } from "../../../core/core.service";
import { DbConnectService } from "../../../core/db-connect/db-connect.service";

@Component({
    selector: 'ngx-evsolapas',
    styleUrls: ['./evsolapas.component.scss'],
    templateUrl: './evsolapas.component.html',
})

export class EvsolapasComponent implements OnInit {

    public cliente: boolean = true;
    public evento: boolean = false;
    public presupuesto: boolean = false;
    public contrato: boolean = false;
    public facturacion: boolean = false;
    public invitados: boolean = false;



    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {

    }

    ngOnInit() {

    }

    solapaCliente() {
        this.cliente = true;
        this.evento = false;
        this.presupuesto = false;
        this.contrato = false;
        this.facturacion = false;
        this.invitados = false;
    }

    solapaEvento() {
        this.cliente = false;
        this.evento = true;
        this.presupuesto = false;
        this.contrato = false;
        this.facturacion = false;
        this.invitados = false;
    }

    solapaPresupuesto() {
        this.cliente = false;
        this.evento = false;
        this.presupuesto = true;
        this.contrato = false;
        this.facturacion = false;
        this.invitados = false;
    }

    solapaContrato() {
        this.cliente = false;
        this.evento = false;
        this.presupuesto = false;
        this.contrato = true;
        this.facturacion = false;
        this.invitados = false;
    }

    solapaFacturacion() {
        this.cliente = false;
        this.evento = false;
        this.presupuesto = false;
        this.contrato = false;
        this.facturacion = true;
        this.invitados = false;
    }

    solapaInvitados() {
        this.cliente = false;
        this.evento = false;
        this.presupuesto = false;
        this.contrato = false;
        this.facturacion = false;
        this.invitados = true;
    }



}
