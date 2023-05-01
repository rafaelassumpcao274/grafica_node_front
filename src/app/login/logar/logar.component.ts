import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SnackBars } from 'src/app/util/snack-bars';
import { User } from 'src/models/user';

@Component({
  selector: 'login-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.scss']
})

export class LogarComponent implements OnInit {

  @Output () usuarioLogado = new EventEmitter()



  hide:boolean = true;
  loading = false;
  formUser:FormGroup = User.formUser();
  usuario:User = new User;
  info:SnackBars = new SnackBars(this.snackBar);

  constructor(
    private service:AuthenticationService,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let usuario:User =this.formUser.value;
    this.loading = true
    this.service.logar(usuario).subscribe((msg) =>{
        this.usuario = msg.user;
        this.loading = false;
        this.usuarioLogado.emit(this.usuario)
    },(error)=>{
      this.loading = false;
      this.info.showMessageError(error)
    });
  }
}
