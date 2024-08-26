import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AppService } from '../app.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() actionData: {
    name?: string;
    function?: string;
    column?: string[];
    selectedRowInfo?: any;
  } = {};
  @Output() editEvent = new EventEmitter<{
    isEdit: boolean;
    rowData: any;
    selectedRowIndex?: any;
  }>();
  rowData = [
    {
      company: 'Apple',
      revenue: 365817,
      profit: 94680,
      marketCap: 2254000,
      peRatio: 28.72, // Price-to-Earnings Ratio
      eps: 3.28, // Earnings Per Share
      debtToEquity: 1.55, // Debt-to-Equity Ratio
      result: '',
      algo: {},
    },
    {
      company: 'Microsoft',
      revenue: 184900,
      profit: 61270,
      marketCap: 2117000,
      peRatio: 34.16,
      eps: 8.05,
      debtToEquity: 0.68,
      result: '',
      algo: {},
    },
    {
      company: 'Amazon',
      revenue: 469822,
      profit: 33364,
      marketCap: 1733000,
      peRatio: 58.52,
      eps: 0.31,
      debtToEquity: 1.29,
      result: '',
      algo: {},
    },
  ];

  colDefs: ColDef[] = [
    { field: 'company', headerName: 'Company' },
    {
      field: 'revenue',
      headerName: 'Revenue (in millions)',
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
    {
      field: 'profit',
      headerName: 'Profit (in millions)',
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
    {
      field: 'marketCap',
      headerName: 'Market Cap (in billions)',
      valueFormatter: (params) => `$${(params.value / 1000).toFixed(2)}B`,
    },
    {
      field: 'peRatio',
      headerName: 'P/E Ratio',
      valueFormatter: (params) => params.value.toFixed(2),
    },
    {
      field: 'eps',
      headerName: 'Earnings Per Share (EPS)',
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'debtToEquity',
      headerName: 'Debt-to-Equity Ratio',
      valueFormatter: (params) => params.value.toFixed(2),
    },
    {
      field: 'result',
      headerName: 'Result',
      editable: true,
      cellRenderer: (params: any) => {
        // console.log('params', params);
        return `<input type="text" value="${params.value}" style="width: 100%;" class="form-control"/>`;
      },
    },
  ];

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) {}

  gridOptions: GridOptions = {
    onCellClicked: this.onCellClicked.bind(this),
  };

  ngOnInit(): void {
    // Subscribe to the actionData observable
    this.appService.actionData$.subscribe(
      (data: {
        name?: string;
        function?: string;
        column?: string[];
        selectedRowInfo?: any;
      }) => {
        this.actionData = data;
        console.log('Received action data in TableComponent:', this.actionData);
        this.updateResultsBasedOnActionData();
      }
    );
  }

  onCellClicked(event: any) {
    console.log('Cell clicked:', event);
    this.onEditClick(event.rowIndex);
  }

  onEditClick(rowIndex: number) {
    console.log('editClicked');
    const selectedRow = this.rowData[rowIndex];
    const editData = {
      isEdit: true,
      rowData: selectedRow,
      selectedRowIndex: rowIndex,
    };
    console.log(editData);
    this.editEvent.emit(editData);
  }

  updateResultsBasedOnActionData(): void {
    if (
      this.actionData &&
      this.actionData.function &&
      !this.actionData?.selectedRowInfo?.isEdit
    ) {
      console.log('Create Mode');
      this.rowData.forEach((row) => {
        switch (this.actionData.function) {
          case 'Add':
            row.result = this.sumColumns(
              row,
              this.actionData.column
            ).toString();
            break;
          case 'Max':
            row.result = this.maxColumns(
              row,
              this.actionData.column
            ).toString();
            break;
          case 'Min':
            row.result = this.minColumns(
              row,
              this.actionData.column
            ).toString();
            break;
          default:
            row.result = '';
        }
        row.algo = {
          name: this.actionData.name,
          function: this.actionData.function,
          column: this.actionData.column,
        };
        console.log('rowdata--->', this);
      });
    } else {
      console.log('Edit Mode', this);
      const selectedRowIndex =
        this.actionData?.selectedRowInfo?.selectedRowIndex;
      if (selectedRowIndex !== undefined) {
        switch (this.actionData.function) {
          case 'Add':
            this.rowData[selectedRowIndex].result = this.sumColumns(
              this.rowData[selectedRowIndex],
              this.actionData.column
            ).toString();
            break;
          case 'Max':
            this.rowData[selectedRowIndex].result = this.maxColumns(
              this.rowData[selectedRowIndex],
              this.actionData.column
            ).toString();
            break;
          case 'Min':
            this.rowData[selectedRowIndex].result = this.minColumns(
              this.rowData[selectedRowIndex],
              this.actionData.column
            ).toString();
            break;
          default:
            this.rowData[selectedRowIndex].result = '';
        }
        this.rowData[selectedRowIndex].algo = {
          name: this.actionData.name,
          function: this.actionData.function,
          column: this.actionData.column,
        };
      }
    }
    this.rowData = [...this.rowData];
    // this.cdr.detectChanges();
  }

  sumColumns(row: any, columns: string[] | undefined): number {
    var bc = this.actionData.selectedRowInfo?.rowData.result;
    if (!columns) return 0;
    return columns.reduce((acc, col) => acc + (row[col] || 0), 0);
  }

  minColumns(row: any, columns: string[] | undefined): number {
    if (!columns) return Infinity;
    return columns.reduce(
      (min, col) => Math.min(min, row[col] || Infinity),
      Infinity
    );
  }

  maxColumns(row: any, columns: string[] | undefined): number {
    if (!columns) return -Infinity;
    return columns.reduce(
      (max, col) => Math.max(max, row[col] || -Infinity),
      -Infinity
    );
  }

  onInput(event: Event, params: any) {
    const input = event.target as HTMLInputElement;
    params.data.result = input.value;
    console.log(params);
  }

  getColDefs(): ColDef[] {
    console.log('colDef');
    return this.colDefs.filter((colDef) => colDef.field !== 'result');
  }
}
