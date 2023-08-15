import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentosComponent } from './acabamentos.component';

describe('AcabamentosComponent', () => {
  let component: AcabamentosComponent;
  let fixture: ComponentFixture<AcabamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcabamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcabamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
