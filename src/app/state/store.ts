import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Todo } from '../todo.models'

export interface TodoState {
    todos: Todo[];
    isLoaded: boolean;
}
export const getInitialState = () => {
    return { todos: [], isLoaded: false };
};

@Injectable({
    providedIn: 'root',
})

@StoreConfig({name: 'todo'})
export class TodoStore extends Store<TodoState> {
    constructor() {
        super(getInitialState());
    }
} 