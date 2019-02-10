import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidateComponent } from './input-validate.component';

describe('InputValidateComponent', () => {
  let component: InputValidateComponent;
  let fixture: ComponentFixture<InputValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
