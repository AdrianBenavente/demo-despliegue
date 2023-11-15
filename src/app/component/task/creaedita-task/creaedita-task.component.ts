import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Person } from 'src/app/model/person';
import { Task } from 'src/app/model/task';
import { PersonService } from 'src/app/service/person.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-creaedita-task',
  templateUrl: './creaedita-task.component.html',
  styleUrls: ['./creaedita-task.component.css'],
})
export class CreaeditaTaskComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  task: Task = new Task();
  mensaje: string = '';
  fecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  niveles: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
  ];
  listaPersonas: Person[] = [];
  idPersonSeleccionado: number = 0;
  constructor(
    private tS: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pS: PersonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idTask: [''],
      nameTask: ['', Validators.required],
      startTask: ['', Validators.required],
      endDateTask: ['', Validators.required],
      difficultyLevelTask: ['', Validators.required],
      person: ['', Validators.required],
    });
    this.pS.list().subscribe((data) => {
      this.listaPersonas = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.task.idTask = this.form.value.idTask;
      this.task.nameTask = this.form.value.nameTask;
      this.task.startTask = this.form.value.startTask;
      this.task.endDateTask = this.form.value.endDateTask; 
      this.task.difficultyLevelTask = this.form.value.difficultyLevelTask;
      this.task.person.idPerson = this.form.value.person;
      console.log(this.task.startTask)
      if (this.edicion) {
        this.tS.update(this.task).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.task).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['components/tareas']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTask: new FormControl(data.idTask),
          nameTask: new FormControl(data.nameTask),
          startTask: new FormControl(data.startTask),
          endDateTask: new FormControl(data.endDateTask),
          difficultyLevelTask: new FormControl(data.difficultyLevelTask),
          person: new FormControl(data.person.idPerson),
        });
      });
    }
  }
}
