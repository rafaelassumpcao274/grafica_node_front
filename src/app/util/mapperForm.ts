import { FormControl, FormGroup } from "@angular/forms";

export class mapperForms{

    convertForm<T>(obj:T):FormGroup{
        let form = Object 
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                form[key] = new FormControl();
                
            }
        }

        return new FormGroup({});


    }


}