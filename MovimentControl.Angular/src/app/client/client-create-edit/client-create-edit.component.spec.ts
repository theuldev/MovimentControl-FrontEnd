import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateEditComponent } from './client-create-edit.component';

describe('ClientCreateEditComponent', () => {
  let component: ClientCreateEditComponent;
  let fixture: ComponentFixture<ClientCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
