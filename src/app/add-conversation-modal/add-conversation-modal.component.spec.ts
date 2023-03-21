import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConversationModalComponent } from './add-conversation-modal.component';

describe('AddConversationModalComponent', () => {
  let component: AddConversationModalComponent;
  let fixture: ComponentFixture<AddConversationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConversationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConversationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
