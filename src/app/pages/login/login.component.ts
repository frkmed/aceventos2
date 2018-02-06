import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../core/auth/authentication.service";
import { CoreService } from "../../core/core.service";
import { DbConnectService } from "../../core/db-connect/db-connect.service";


@Component({
    selector: 'ngx-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    starRate = 2;
    heartRate = 4;

    formLogin: FormGroup;
    private fb: FormBuilder;
    current: number = 1;

    // Login Form
    public mail: string;
    public nombre: string;
    public password: string;


    public message: boolean = false;
    public mensaje: string = '';

    constructor(public router: Router, private coreService: CoreService, private http: Http,
                private dbConnectService: DbConnectService, private authService: AuthenticationService) {

        this.coreService.getLoginStatus.subscribe(data => {
            console.log(data);
        });

    }

    ngOnInit() {
        this.formLogin = this.buildFormLogin(this.formLogin);
    }

    fnLogin() {
        this.message = false;
        this.mensaje = '';

        if (!this.formLogin.valid) {
            this.onLoggedout();
            this.message = true;
            this.mensaje = 'Los datos ingresados no son validos';
            return;
        } else {
            console.log('login...');
            this.authService.login(this.formLogin.get('mail').value, this.formLogin.get('password').value)
                .subscribe(data => {
                    console.log(data);
                    this.onLoggedin();
                    this.router.navigate(['/dashboard']);
                    //this.coreService.setLoginStatus({ showLogin: false });
                }, err => {
                    console.log(err);
                    this.message = true;
                    this.mensaje = err.message;
                });
        }
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    onLoggedout() {
        localStorage.setItem('isLoggedin', 'false');
    }

    buildFormLogin(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        form = this.fb.group({
            'mail': [this.mail, [Validators.required, Validators.email]],
            'password': [this.password, [Validators.required, Validators.minLength(1)]]
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrorsLogin, this.validationMessagesLogin));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    public formErrorsLogin = {
        'mail': '',
        'password': ''
    };
    validationMessagesLogin = {
        'mail': {
            'required': 'El mail es requerido',
            'maxlength': 'El mail debe tener un máximo de 50 letras'
        },
        'password': {
            'required': 'Debe ingresar una contraseña',
            'minlength': 'El password debe tener al menos tres letras y/o números'
        }
    };

}
