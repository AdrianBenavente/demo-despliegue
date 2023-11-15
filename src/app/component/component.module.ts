import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { CreaeditaPersonComponent } from './person/creaedita-person/creaedita-person.component';
import { ListarPersonComponent } from './person/listar-person/listar-person.component';
import { ReportePersonComponent } from './person/reporte-person/reporte-person.component';
import { PersonComponent } from './person/person.component';
import { TaskComponent } from './task/task.component';
import { CreaeditaTaskComponent } from './task/creaedita-task/creaedita-task.component';
import { ListarTaskComponent } from './task/listar-task/listar-task.component';
import { ReporteTaskComponent } from './task/reporte-task/reporte-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    PersonComponent,
    CreaeditaPersonComponent,
    ListarPersonComponent,
    ReportePersonComponent,
    TaskComponent,
    CreaeditaTaskComponent,
    ListarTaskComponent,
    ReporteTaskComponent,
    ReporteComponent,
    Reporte01Component,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule
  ],
})
export class ComponentModule {}
