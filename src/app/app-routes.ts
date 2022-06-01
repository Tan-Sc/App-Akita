import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { Route } from '@angular/router'; 

export const ROUTES: Route[] = [
  {
    path: '',
    component: HomeComponent,

  }, {
    path: 'add-todo',
    component: AddTodoComponent,
  }
];