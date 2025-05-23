import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriestProfileComponent } from './priest-profile.component';

describe('PriestProfileComponent', () => {
  let component: PriestProfileComponent;
  let fixture: ComponentFixture<PriestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriestProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
