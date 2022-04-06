import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesComponent } from './ces.component';

describe('CesComponent', () => {
  let component: CesComponent;
  let fixture: ComponentFixture<CesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
