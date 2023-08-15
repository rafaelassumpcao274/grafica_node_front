import { FormControl, FormGroup } from "@angular/forms";
import { Auditoria } from "./auditoria";

export class Acabamentos extends Auditoria{
    descricao: string = ""


    static formAcabamentos(){
        return new FormGroup({            
            id: new FormControl(0),
            descricao : new FormControl(''),
            createdAt:new FormControl(new Date()),
            updatedAt: new FormControl(new Date()),
            userInc:new FormControl(''),
            userUpdate: new FormControl('')
        });
      }
}