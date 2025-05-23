import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishionerComponent } from './parishioner.component';

describe('ParishionerComponent', () => {
  let component: ParishionerComponent;
  let fixture: ComponentFixture<ParishionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParishionerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParishionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
