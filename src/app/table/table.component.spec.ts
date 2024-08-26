import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { AppService } from '../app.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { ComponentMetadataProvider } from 'ag-grid-community/dist/types/core/components/framework/componentMetadataProvider';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let appServiceStub: Partial<AppService>;

  beforeEach(async () => {
    appServiceStub = {
      actionData$: of({
        name: 'Sum Test',
        function: 'Add',
        column: ['revenue', 'profit'],
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: AppService, useValue: appServiceStub },
        ChangeDetectorRef,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    console.log('Component instance:', component);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    console.log('component', component);
    expect(component).toBeTruthy();
  });

  // it('should update rowData based on actionData when updateResultsBasedOnActionData is called', () => {
  //   // Simulate actionData
  //   component.actionData = {
  //     name: 'Sum Test',
  //     function: 'Add',
  //     column: ['revenue', 'profit'],
  //   };

  //   component.updateResultsBasedOnActionData();
  //   expect(component.rowData[0].result).toBe((365817 + 94680).toString());
  //   expect(component.rowData[1].result).toBe((184900 + 61270).toString());
  //   expect(component.rowData[2].result).toBe((469822 + 33364).toString());
  // });

  // it('should emit editEvent when onEditClick is called', () => {
  //   const rowIndex = 1;
  //   const selectedRow = component.rowData[rowIndex];
  //   const spy = jest.spyOn(component.editEvent, 'emit');
  //   component.onEditClick(rowIndex);

  //   expect(spy).toHaveBeenCalledWith({
  //     isEdit: true,
  //     rowData: selectedRow,
  //     selectedRowIndex: rowIndex,
  //   });
  // });

  it('should correctly sum columns when sumColumns is called', () => {
    const row = {
      revenue: 1000,
      profit: 500,
    };
    const columns = ['revenue', 'profit'];
    const result = component.sumColumns(row, columns);

    expect(result).toBe(1500);
  });

  it('should return the minimum value when minColumns is called', () => {
    const row = {
      revenue: 1000,
      profit: 500,
    };
    const columns = ['revenue', 'profit'];
    const result = component.minColumns(row, columns);

    expect(result).toBe(500);
  });

  it('should return the maximum value when maxColumns is called', () => {
    const row = {
      revenue: 1000,
      profit: 500,
    };
    const columns = ['revenue', 'profit'];
    const result = component.maxColumns(row, columns);

    expect(result).toBe(1000);
  });
});
