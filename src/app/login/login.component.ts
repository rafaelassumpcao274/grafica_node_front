import { Component, ComponentFactory, DoCheck, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';
import { AuthenticationService } from '../service/authentication.service';
import { SnackBars } from '../util/snack-bars';


@Component({
  selector: 'templante-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  hide:boolean = true;
  temUsuario:boolean = false;
  loading = false;
  formUser:FormGroup = User.formUser();
  usuarioLogado:User = new User;

  constructor(
    private service:AuthenticationService,
    private snackBar:MatSnackBar,
    private route: ActivatedRoute,
  ) {}


    info:SnackBars = new SnackBars(this.snackBar);


  ngOnInit(): void {

    let user:User = this.obterUsuarioLogado()
    if(user){

       this.temUsuario = this.validaUsuarioLogado();
       this.usuarioLogado = user;
    }


  }

  obterUsuario():void{

    this.usuarioLogado = localStorage.getItem('usuario')
    ? JSON.parse(atob(localStorage.getItem('usuario') ?? ''))
    : null;


  }

  obterUsuarioLogado():User{
    return localStorage.getItem('usuario')
    ? JSON.parse(atob(localStorage.getItem('usuario') ?? ''))
    : null;
  }


  validaUsuarioLogado():boolean {
    return this.service.logado();
  }


  ngOnDestroy() {

  }






}
