import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-reporte-task',
  templateUrl: './reporte-task.component.html',
  styleUrls: ['./reporte-task.component.css']
})
  export class ReporteTaskComponent {

    dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
    Form: FormGroup = new FormGroup({});
    mensaje: string = '';
    fechaVacia: boolean = false;
    caja: string = '';
    displayedColumns: string[] = ['codigo', 'tarea', 'nivel', 'persona'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private tS: TaskService, private formBuilder: FormBuilder) {}
  
    limpiar() {
      this.tS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.caja = '';
      this.mensaje='';
    }
  
    buscar(dificultad: any) {
      this.tS.buscar(dificultad.target.value).subscribe((data) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          this.mensaje = 'No se encontraron resultados para la dificultad seleccionada.';
        } else {
          this.mensaje = '';
        }
      });
    }
  }
  
