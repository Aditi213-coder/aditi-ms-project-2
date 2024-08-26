import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Modal } from 'bootstrap';
import { TableComponent } from './table/table.component';
import { ChangeDetectorRef } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  colDefs: ColDef[] = [];
  actionData: any = {};
  private modal!: Modal;
  selectedRowIndex!: any;
  selectedRowData!: any;
  title: any;

  constructor(private cdr: ChangeDetectorRef, private appService: AppService) {}

  ngAfterViewInit(): void {
    this.colDefs = this.tableComponent.getColDefs();
  }

  handleEditEvent(event: any) {
    if (event.isEdit) {
      console.log('Edit event triggered for row:', event.rowData);
      this.selectedRowIndex = event;

      this.openModal();
    }
  }

  // Open  modal
  openModal() {
    const modalElement = document.getElementById('actionModal');
    this.modal = new Modal(modalElement as HTMLElement);
    this.modal.show();
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  handleFormSubmit(formValue: any): void {
    // console.log('Received form value:', formValue);
    this.appService.setActionData(formValue);
    this.closeModal();
  }
}
