import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOutputComponent } from './code-output.component';

describe('CodeOutputComponent', () => {
  let component: CodeOutputComponent;
  let fixture: ComponentFixture<CodeOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeOutputComponent]
    });
    fixture = TestBed.createComponent(CodeOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
