import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-reporte-person',
  templateUrl: './reporte-person.component.html',
  styleUrls: ['./reporte-person.component.css']
})
export class ReportePersonComponent implements OnInit {
  dataSource: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  fechaForm: FormGroup = new FormGroup({});
  mensaje: string = '';
  fechaVacia: boolean = false;

  displayedColumns: string[] = ['codigo', 'persona', 'genero', 'email'];

  constructor(private pS: PersonService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fechaForm = this.formBuilder.group({
      fecha: [null, Validators.required],
    });
  }

 
  buscar() {
    if (this.fechaForm.valid) {
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0, 10);
      this.pS.buscar(fechas).subscribe((data) => {        
        this.dataSource.data = data;       
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para la fecha seleccionada.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.fechaForm.get('fecha')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese una fecha.';
      }
    }
}

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.fechaForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}

