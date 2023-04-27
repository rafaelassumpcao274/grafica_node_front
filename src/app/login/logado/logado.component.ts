import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'login-logado',
  templateUrl: './logado.component.html',
  styleUrls: ['./logado.component.scss']
})


export class LogadoComponent implements OnInit {

  @Input()
  usuario : User = new User();

  @Output() usuarioChange = new EventEmitter<User>();

  constructor(
    private service:AuthenticationService,
  ) { }



  ngOnInit(): void {

  }


  deslogar(){


    this.service.deslogar();
    this.usuarioChange.emit(new User);
  }
}
