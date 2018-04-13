import {DbHelperService} from '../db-helper/db-helper.service';
import {OnInit, Injectable, ReflectiveInjector} from "@angular/core";
import {
    Http, Response, RequestOptions, Headers, BrowserXhr, BaseRequestOptions,
    BaseResponseOptions, XHRBackend, CookieXSRFStrategy, XSRFStrategy, ConnectionBackend, ResponseOptions
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

import {CoreService} from '../core.service';
import {CacheService} from '../cache/cache.service';

@Injectable()
export class DbConnectService implements OnInit {

    private _dbHelper = new DbHelperService();
    private _http: Http;
    private _baseUrl: string = './server/api.php';
    //private _baseUrl: string = 'http://localhost:80/aceventos/src/app/server/api.php';

    constructor(private coreService: CoreService) {

        let injector = ReflectiveInjector.resolveAndCreate([
            Http,
            BrowserXhr,
            {provide: RequestOptions, useClass: BaseRequestOptions},
            {provide: ResponseOptions, useClass: BaseResponseOptions},
            {provide: ConnectionBackend, useClass: XHRBackend},
            {provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy()}
        ]);
        this._http = injector.get(Http);
        //console.log(this._http);

    }

    ngOnInit() {
    }

    public get(obj: string, fnc: string, prm: any) {

        this.coreService.setLoadingStatus(true);

        if (CacheService.get[obj] != null && CacheService.get[obj][fnc] != null) {
            return new BehaviorSubject(CacheService.get(obj, fnc));
        }

        let header = {};

        if (localStorage.getItem('currentUser')) {
            header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
            }
        } else {
            header = {
                'Content-Type': 'application/json'
            }
        }

        let options = new RequestOptions({headers: new Headers(header)});


        let response = this._http.get(this._dbHelper.format(this._baseUrl, obj, fnc, prm), options);

        return response
            .map((data: Response) => {
                return this.extractData(obj, fnc, data, this.coreService);
            })
            .catch((err: Response | any): any => {
                return this.handleError(err, this.coreService);
            })
            .share();

    }

    public post(obj: string, fnc: string, prm: any) {
        this.coreService.setLoadingStatus(true);
        let header = {};
        if (localStorage.getItem('currentUser') || prm['token_social']) {
            if (JSON.parse(localStorage.getItem('currentUser'))) {

                header = {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
                }
            } else {

                header = {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    'Authorization': 'Bearer ' + prm['token_social']
                }
            }
        } else {
            header = {
                'Content-Type': 'application/json'
            }
        }

        let options = new RequestOptions({headers: new Headers(header)});

        let response = this._http.post(this._dbHelper.format(this._baseUrl, obj, fnc, prm), {}, options);

        return response
            .map((data: Response) => {
                return this.extractData(obj, fnc, data, this.coreService);
            })
            .catch((err: Response | any) => {
                return this.handleError(err, this.coreService);
            })
            .share();

    }

    public delete(obj: string, fnc: string, prm: any) {

    }

    /**
     * Servicio que escucha por cambios realizados en el form.
     * @param data
     * @param form
     * @param formErrors
     * @param validationMessages
     */
    onValueChanged(data?: any, form?: any, formErrors?: any, validationMessages?: any) {
        if (!form) {
            return;
        }
        // const form = form;
        for (const field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    public extractData(obj: string, fnc: string, data: Response, coreService) {
        //console.log(data);

        if (data['_body'] != '') {

            let body = data.json() || data;
            CacheService.set(obj, fnc, body);

            if (data['statusText'].indexOf('Expired') > -1) {
                this.coreService.logOut();
            }

            coreService.setLoadingStatus(false);
            return body || {};
        } else {
            coreService.setLoadingStatus(false);
            return {}
        }
    }

    private handleError(error: Response | any, coreService) {
        console.log(error);

        // In a real world app, you might use a remote logging infrastructure
        let errMsg2: any;
        let errMsg: string;
        let isJson: boolean;
        let err = '';
        if (error instanceof Response) {

            try {
                error.json();
                isJson = true;
            } catch (e) {
                isJson = false;
            }

            const body = (isJson) ? error.json() : error['_body'];
            err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            errMsg2 = {status: error.status, statusText: error.statusText, message: err };
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        coreService.setToast({type: 'error', title: 'Upppssss', body: errMsg.split('-')[3].replace('\"','')});
        coreService.setLoadingStatus(false);
        console.log(errMsg2);
        //return Observable.throw(errMsg);
        return Observable.throw(errMsg2);
    }

}
