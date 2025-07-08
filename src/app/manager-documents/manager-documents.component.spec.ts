import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDocumentsComponent } from './manager-documents.component';

describe('ManagerDocumentsComponent', () => {
  let component: ManagerDocumentsComponent;
  let fixture: ComponentFixture<ManagerDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
