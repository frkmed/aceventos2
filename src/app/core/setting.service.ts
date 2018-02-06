import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DbConnectService} from './db-connect/db-connect.service';
import {CoreService} from './core.service';
import {CacheService} from './cache/cache.service';


@Injectable()
export class SettingService {

    private user: any = {};

    constructor(private dbConnectService: DbConnectService, private coreService: CoreService) {

        // dbConnectService.get('productos', 'getCategorias', {}).subscribe((data)=> {
        //     coreService.setCategorias(data);
        // });

        if (localStorage.getItem('currentUser')) {
            // this.user = JSON.parse(localStorage.getItem('currentUser')).user;
            // this.setUpUser();
        } else {
            // this.setUpGuest();
        }

        coreService.getLoginStatus.subscribe(data=> {
            if (localStorage.getItem('currentUser')) {
                this.user = JSON.parse(localStorage.getItem('currentUser')).user;
                // this.setUpUser();
            } else {
                // this.setUpGuest();
            }
        });


    }

}
