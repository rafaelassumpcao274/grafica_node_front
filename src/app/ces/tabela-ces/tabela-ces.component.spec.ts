import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCesComponent } from './tabela-ces.component';

describe('TabelaCesComponent', () => {
  let component: TabelaCesComponent;
  let fixture: ComponentFixture<TabelaCesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaCesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaCesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
