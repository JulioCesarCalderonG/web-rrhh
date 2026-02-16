import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css']
})
export class TableMaterialComponent implements OnInit {

   @Input() columnas: ColumnaTabla[] = [];
  @Input() totalRegistros = 0;
  @Input() pageSize = 10;

  //@Output() pageChange = new EventEmitter<PageEvent>();
  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  ngOnInit() {
    this.displayedColumns = this.columnas.map(c => c.campo);
    this.displayedColumns.push('acciones');
  }

  setData(data: any[]) {
    this.dataSource.data = data;
  }
}
