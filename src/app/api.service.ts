import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Todo } from './todo.models';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    private readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    addTask(title: string, describe: string): Observable<Todo> {

        return this.http.post<Todo>(this.baseUrl, { title, describe });
    }

    getTask(): Observable<Todo[]> {

        return this.http.get<{ data: Todo[] }>(this.baseUrl).pipe(
            map((res) => res.data),
        );
    }
    
    deleteTask(id: string): Observable<Todo> {
        return this.http.delete<Todo>(`${this.baseUrl}/${id}`);
    }

    updateTask(id: string, changes: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.baseUrl}/${id}`, changes);
    }
}
