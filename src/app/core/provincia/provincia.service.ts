import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class ProvinciaService implements OnInit {

    static provincia: Array<any> = [
        {id: 1, name: 'Buenos Aires'},
        {id: 2, name: 'Catamarca'},
        {id: 3, name: 'Chaco'},
        {id: 4, name: 'Chubut'},
        {id: 5, name: 'Ciudad Autónoma de Buenos Aires'},
        {id: 6, name: 'Córdoba'},
        {id: 7, name: 'Corrientes'},
        {id: 8, name: 'Entre Ríos'},
        {id: 9, name: 'Formosa'},
        {id: 10, name: 'Jujuy'},
        {id: 11, name: 'La Pampa'},
        {id: 12, name: 'La Rioja'},
        {id: 13, name: 'Mendoza'},
        {id: 14, name: 'Misiones'},
        {id: 15, name: 'Neuquén'},
        {id: 16, name: 'Río Negro'},
        {id: 17, name: 'Salta'},
        {id: 18, name: 'San Juan'},
        {id: 19, name: 'San Luis'},
        {id: 20, name: 'Santa Cruz'},
        {id: 21, name: 'Santa Fe'},
        {id: 22, name: 'Santiago del Estero'},
        {id: 23, name: 'Tierra del Fuego, Antártida e Isla del Atlántico Sur'},
        {id: 24, name: 'Tucumán'}];

    ngOnInit() {
    }

    constructor() {
    }

    static get() {
        return ProvinciaService.provincia;
    }

}