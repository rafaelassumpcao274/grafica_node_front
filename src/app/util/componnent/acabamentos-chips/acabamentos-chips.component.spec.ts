import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentosChipsComponent } from './acabamentos-chips.component';

describe('AcabamentosChipsComponent', () => {
  let component: AcabamentosChipsComponent;
  let fixture: ComponentFixture<AcabamentosChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcabamentosChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcabamentosChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
