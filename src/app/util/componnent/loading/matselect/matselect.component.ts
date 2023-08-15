import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-matselect',
  templateUrl: './matselect.component.html',
  styleUrls: ['./matselect.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule,MatFormFieldModule]
})
export class MatselectComponent {

}
