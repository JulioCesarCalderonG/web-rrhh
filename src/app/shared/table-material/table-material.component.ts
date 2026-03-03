import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css']
})
export class TableMaterialComponent implements OnInit,OnChanges  {

  @Input() columnas: ColumnaTabla[] = [];
  @Input() totalRegistros = 0;
  @Input() pageSize: number = 30;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 30, 50];
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  ngOnInit() {
    this.displayedColumns = this.columnas.map(c => c.campo);
    this.displayedColumns.push('acciones');
  }

 /*  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRegistros'] && this.paginator) {
      this.paginator.length = this.totalRegistros;
    }
  }

  setData(data: any[]) {
    this.dataSource.data = data;
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
