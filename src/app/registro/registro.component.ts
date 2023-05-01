import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';
import { AuthenticationService } from '../service/authentication.service';
import { SnackBars } from '../util/snack-bars';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  hide:boolean = false;
  loading = false;
  formUser:FormGroup = User.formUser();
  constructor(
    private service:AuthenticationService,
    private snackBar:MatSnackBar,
    private route: ActivatedRoute,
  ) {}

    info:SnackBars = new SnackBars(this.snackBar);
  ngOnInit(): void {
  }


  onSubmit(){
    let usuario:User =this.formUser.value;
    this.service.registrar(usuario).subscribe((msg) =>{
        console.info(msg);
        this.loading = false;
    },(error)=>{
      this.loading = false;
      this.info.showMessageError(error)
    });

  }
}
