import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { CreaeditaPersonComponent } from './person/creaedita-person/creaedita-person.component';
import { ReportePersonComponent } from './person/reporte-person/reporte-person.component';
import { TaskComponent } from './task/task.component';
import { CreaeditaTaskComponent } from './task/creaedita-task/creaedita-task.component';
import { ReporteTaskComponent } from './task/reporte-task/reporte-task.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {
    path: 'personas',
    component: PersonComponent,
    children: [
      { path: 'nuevo', component: CreaeditaPersonComponent },
      { path: 'ediciones/:id', component: CreaeditaPersonComponent },
      { path: 'reporte', component: ReportePersonComponent },
    ],
  },
  {
    path: 'tareas',
    component: TaskComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTaskComponent },
      { path: 'ediciones/:id', component: CreaeditaTaskComponent },
      { path: 'reportes', component: ReporteTaskComponent },
    ],
  },
  {
    path: 'reportes',
    component: ReporteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentRoutingModule {}
