import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/model/person';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-listar-task',
  templateUrl: './listar-task.component.html',
  styleUrls: ['./listar-task.component.css']
})
export class ListarTaskComponent implements OnInit {
  dataSource: MatTableDataSource<Task> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'tarea',
    'fechainicio',
    'fechafin',
    'nivel',
    'persona',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TaskService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }

}
