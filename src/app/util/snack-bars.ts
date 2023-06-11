
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


export class SnackBars {
  constructor(private snackBar: MatSnackBar) {
  }
  config: MatSnackBarConfig = new MatSnackBarConfig();

  showMessageError(error: HttpErrorResponse) {
    let message = error.error.message ?? error.message;
    if(error.status < 500){

        if(error.status === 400){
          this.showWarning(message);
        }
        if(error.status === 403){
          this.showWarning("Acesso não Autorizado");
        }
        if(error.status === 404){
          this.showError(message)
        }

    }else{
      this.showError(message);
    }
  }


  showSuccess(message: string) {
    this.config.duration = 2000;
    // this.config.panelClass = ['green-snackbar', 'login-snackbar'],
      this.snackBar.open(message, "X", this.config);
  }

  showError(message: string) {
    this.config.duration = 5000;
    this.config.panelClass = ['red-snackbar']
    this.snackBar.open(message, "X", this.config);
  }

  showWarning(message: string) {
    this.config.duration = 5000;
    // this.config.panelClass = ['orange-snackbar', 'login-snackbar'],
      this.snackBar.open(message, "X", this.config);
  }

}
