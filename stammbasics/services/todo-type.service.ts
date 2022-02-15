import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TodoTypeService {

  constructor(private http: HttpClient) { }

  /**
   * returns all todo types
   * @returns {Observable<Object>}
   */
  getTodoTypes(): any {
    return this.http.get('/apiV2/todotypes');
  }


  /**
   * add a vo entry
   * @param name String
   * @returns {Observable<Object>}
   */
  addTodoType(name: string): any {
    return this.http.get('/apiV2/todotypes/create/' + name);
  }

  /**
   * edit a vo entry
   * @param data {Object}
   * @param id String
   * @returns {Observable<Object>}
   */
  editTodoType(id: string, data: any): any {
    return this.http.put('/apiV2/todotypes/change/' + id, data);
  }

  /**
   * delete a list entry
   * @param id 
   * @returns {Observable<Object>}
   */
  deleteTodoType(id: string): any {
    return this.http.get('/apiV2/todotypes/delete/' + id);
  }
}
