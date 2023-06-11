export class DateUtils{

    constructor(){

    }

    addHora(data:Date,horas:number):Date{
        if(!(data instanceof Date)){
          data = new Date(data)            
        }

        data.setHours(data.getHours() + horas)
        return data;
    }


}