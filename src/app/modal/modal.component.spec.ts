import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.colDefs = [{ headerName: 'Name', field: 'name' }];
    component.selectedRowInfo = { id: 1, name: 'Test' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with controls', () => {
    expect(component.modalForm.contains('name')).toBeTruthy();
    expect(component.modalForm.contains('function')).toBeTruthy();
    expect(component.modalForm.contains('column')).toBeTruthy();
  });

  it('should display an error message when name is touched and invalid', () => {
    const nameInput = component.modalForm.get('name');
    nameInput?.setValue('');
    nameInput?.markAsTouched();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.text-danger'));
    expect(errorMsg).toBeTruthy();
  });
});
