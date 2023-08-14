import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class taskservice {
  constructor(private _http: HttpClient) {}

  addTask(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/tasks', data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/tasks/${id}`, data);
  }

  getTask(): Observable<any> {
    return this._http.get('http://localhost:3000/tasks');
  }

  deleteTask(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }
}