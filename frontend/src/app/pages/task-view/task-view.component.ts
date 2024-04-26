import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})

export class TaskViewComponent implements OnInit{

  lists: List[] = [];
  tasks: Task[] = [];
  selectedListId: string | null = null;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {

        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: Task[] | unknown) => {
            if (Array.isArray(tasks)) {
              this.tasks = tasks;
            }
          });
        }
        else {
          this.selectedListId = null;
        }
        
      }
    )

    this.taskService.getLists().subscribe((lists: List[] | unknown) => {
      if (Array.isArray(lists)){
        this.lists = lists;
      }
    });
  }

  isListSelected(): boolean {
    return !!this.selectedListId;
  }

  onTaskClick(task: Task) {
    // We want to set the task to be completed
    this.taskService.completed(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    if (this.selectedListId) { // Check if selectedListId is not null
      this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
        this.router.navigate(['/lists']);
        console.log(res);
      });
    }
  }

  onDeleteTaskClick(id: string) {
    if (this.selectedListId) { // Check if selectedListId is not null
      this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
        this.tasks = this.tasks.filter(val => val._id !== id);
        console.log(res);
      });
    }
  }

  onLogoutButtonClick(){
    this.authService.logout();
  }
  

}
