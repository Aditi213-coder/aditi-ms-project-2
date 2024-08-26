import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() colDefs: ColDef[] = [];
  _selectedRowInfo!: any;
  _selectedRowData!: any;
  popupHeaderText: string = '';
  @Input()
  set selectedRowInfo(value: any) {
    this._selectedRowInfo = value;
    this.updateView();
  }
  get selectedRowInfo(): number {
    return this._selectedRowInfo;
  }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  modalForm!: FormGroup;
  functions: any[] = ['Add', 'Min', 'Max'];
  constructor(private fb: FormBuilder) {}

  updateView(): void {
    console.log('modalform', this.modalForm);
    console.log('Selected Row Index updated:', this._selectedRowInfo);
    this.modalForm?.patchValue(this._selectedRowInfo?.rowData?.algo);
  }

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      name: ['', Validators.required],
      function: ['', Validators.required],
      column: ['', Validators.required],
    });
    if (this._selectedRowInfo && this._selectedRowInfo['isEdit']) {
      this.popupHeaderText = 'Edit Algorithm';
    } else {
      this.popupHeaderText = 'Create Algorithm';
    }
  }

  resetForm(): void {
    this.modalForm.reset();
  }

  onSubmit(): void {
    if (this.modalForm.valid) {
      const formData = this.modalForm.value;

      if (this.selectedRowInfo !== undefined && this.selectedRowInfo !== null) {
        console.log('selected', formData);
        formData.selectedRowInfo = this.selectedRowInfo;
      }

      console.log('Form Submitted', formData);
      this.formSubmit.emit(formData);
      this.resetForm();
    } else {
      console.log('Form is not valid');
    }
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
