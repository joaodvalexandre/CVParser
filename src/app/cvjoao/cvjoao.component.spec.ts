import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVJoaoComponent } from './cvjoao.component';

describe('CVJoaoComponent', () => {
  let component: CVJoaoComponent;
  let fixture: ComponentFixture<CVJoaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVJoaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CVJoaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
