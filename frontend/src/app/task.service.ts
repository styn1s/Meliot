import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { List } from './models/list.model';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private WebReqService: WebRequestService) {  }

  getLists() {
    // We want to get all lists from database
    return this.WebReqService.get('lists');
  }

  createList(title: string): Observable<List> {
    // We want to send a web request to create a list
    return this.WebReqService.post<List>('lists', { title });
  }

  updateList(id: string, title: string): Observable<List> {
    // We want to send a web request to update a list
    return this.WebReqService.patch<List>(`lists/${id}`, { title });
  }

  deleteList(id: string) {
    return this.WebReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    // We want to get all tasks from a specific list
    return this.WebReqService.get(`lists/${listId}/tasks`)
  }

  createTask(title: string, listId: string): Observable<Task> {
    // We want to send a web request to create a list
    return this.WebReqService.post<Task>(`lists/${listId}/tasks`, { title });
  }

  updateTask(listId: string, taskId: string, title: string): Observable<List> {
    // We want to send a web request to update a list
    return this.WebReqService.patch<List>(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.WebReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  completed(task: Task) {
    return this.WebReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
