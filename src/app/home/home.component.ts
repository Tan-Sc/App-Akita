import { filter, switchMap } from 'rxjs/operators';
import { ApiService } from './../api.service';
import { TodoStore } from './../state/store';
import { TodoQuery } from './../state/query';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Todo } from '../todo.models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
 
export class HomeComponent implements OnInit {

    loading = false;
    
    todos: Todo[] = [];

    constructor(private router: Router, private todoQuery: TodoQuery,
                 private todoStore: TodoStore, private apiService: ApiService) { }

    ngOnInit(): void {
        this.todoQuery.getLoading().subscribe(res => this.loading = res);
        this.todoQuery.getTodos().subscribe(res => this.todos = res);
        this.todoQuery.getLoaded().pipe(
            take(1),
            filter(res => !res),
            switchMap(() => {
                this.todoStore.setLoading(true)
                return this.apiService.getTask();
            })
        ).subscribe(res => {
            this.todoStore.update(state => {
                return {
                    todos: res,
                    isLoaded: true,
                };
            });

            this.todoStore.setLoading(false);
        }, err => {
            console.error(err);
            this.todoStore.setLoading(false);
        });
    }

    addTodo() {
        // console.log('addTodo');
        this.router.navigateByUrl('/add-todo');
    }
}
