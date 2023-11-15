import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DifficultyPersonDTO } from '../model/DifficultyPersonDTO';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = `${environment.base}/tareas`;

  private listaCambio = new Subject<Task[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Task[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(t: Task) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, t, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Task[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Task>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(t: Task) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, t, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  buscar(dificultad: string): Observable<Task[]> {
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let params = new HttpParams().set('dificultad', dificultad);

    return this.http.get<Task[]>(`${this.url}/buscar`, {
      headers: headers,
      params: params,
    });
  }
  getSuma(): Observable<DifficultyPersonDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<DifficultyPersonDTO[]>(`${this.url}/dificultades`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
