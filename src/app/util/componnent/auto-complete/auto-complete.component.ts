import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Iservice } from 'src/app/service/interface/iservice';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent<T> implements OnInit {

  /**
   * Classe para usar como bases para buscar no banco 
   * 
   */
  @Input()
  service:Iservice| undefined;

/**
 * 
 * Formato para mostrar tanto no select quanto no input
 * 
 */
  @Input()
  format:string | undefined; 


/**
 * Label para informar o que inserir no campo 
 * 
 */
@Input()
  label:string = '';


@Input()
  limiteBusca = 3


  @Input()
  atributo:string = ''
  /**
   * Lista que possue os valores a mostrar no auto complete 
   * 
   */
  lista:Observable<T[]> | undefined;

modelo: any ;

  form!: FormGroup;

  constructor( private rootFormGroup: FormGroupDirective){
     

    }
  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.form.valueChanges.subscribe(data => {
      console.log('Form changes', data)
    })

  }
  

  autoCompleteService(evento: any){
    let obj = evento.target as HTMLInputElement
    if(this.service && obj.value.length > this.limiteBusca){
      this.lista = this.service.listarAutoComplete(obj);
    }

  }

  insertValueForm(){
    if(typeof this.modelo === 'object'){
      this.form.controls[this.atributo].patchValue(this.modelo);
    }

  }

  displayFn(obj:unknown):string{
    let text:string = '';

  try{

    if(!this.format){
      throw new Error("Format required !!!");
    }

    if(obj){
      text = this.format;
      const textSplit = this.format?.split(' ');
  
      const propriedades = textSplit?.filter(propriedade => typeof propriedade === 'string' && this.buscarPropriedade(obj as Record<string,unknown>,propriedade));
    
      if (propriedades && typeof obj === 'object') {
       for (const prop of propriedades){
          if (this.buscarPropriedade(obj as Record<string, unknown>, prop)) {
            const valor = this.buscarPropriedade(obj as Record<string, unknown>, prop);
            if (valor) {
              text = text.replace(prop, valor.toString());
            }
          }
        };
      }
    }
    

  }catch(e){
    console.error(e)
      }
      return text;
  }

  displayOption(obj:unknown):string{

    if(this.format && this.lista){
      let text = this.format;
      const textSplit = this.format?.split(' ');
  
      const propriedades = textSplit?.filter(propriedade => typeof propriedade === 'string' && this.buscarPropriedade(obj as Record<string,unknown>,propriedade));
    
      if (propriedades && typeof obj === 'object') {
       for (const prop of propriedades){
          if (this.buscarPropriedade(obj as Record<string, unknown>, prop)) {
            const valor = this.buscarPropriedade(obj as Record<string, unknown>, prop);
            if (valor) {
              text = text.replace(prop, valor.toString());
            }
          }
        };
        return text;
      }
    }
  return '';
    
  }


  buscarPropriedade<T, K extends keyof T>(objeto: T, propriedade: K): T[K] | undefined {
    return objeto[propriedade];
  }
  
}
