export class Evento {

    constructor(public id: number,
                public nombre: string,
                public tipo_evento_id: number,
                public estado_evento_id: number,
                public cliente_id: number,
                public fecha_pedido: string,
                public fecha_evento: string,
                public invitados: number,
                public salon_id: number,
                public detalle: string,
                public empresa_id: number,
                public tipoEvento: string){

    }

}
