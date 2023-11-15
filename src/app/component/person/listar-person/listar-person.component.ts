import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/model/person';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listar-person',
  templateUrl: './listar-person.component.html',
  styleUrls: ['./listar-person.component.css'],
})
export class ListarPersonComponent implements OnInit {
  dataSource: MatTableDataSource<Person> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'persona',
    'email',
    'fecha',
    'genero',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: PersonService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
