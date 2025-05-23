import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishionerTabComponent } from './parishioner-tab.component';

describe('ParishionerTabComponent', () => {
  let component: ParishionerTabComponent;
  let fixture: ComponentFixture<ParishionerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParishionerTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParishionerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
