import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  selectedListId?: string | null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.selectedListId = params['listId'];
        this.taskService.getTasks(params['listId']).subscribe((tasks: Task[] | unknown) => {
          this.tasks = tasks as Task[] ?? []; // Cast tasks as Task[]
          console.log(this.tasks);
        });
      } else {
        this.selectedListId = null;
        this.tasks = [];
      }
    });

    this.taskService.getLists().subscribe((lists: List[] | unknown) => {
      this.lists = lists as List[] ?? []; // Cast lists as List[]
    });
  }

  isListSelected(): boolean {
    return !!this.selectedListId;
  }

  onTaskClick(task: Task) {
    this.taskService.completed(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    if (this.selectedListId) {
      this.taskService.deleteList(this.selectedListId).subscribe(() => {
        this.router.navigate(['/lists']);
        this.selectedListId = null;
        this.tasks = [];
      });
    }
  }

  onDeleteTaskClick(id: string) {
    if (this.selectedListId) {
      this.taskService.deleteTask(this.selectedListId, id).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task._id !== id);
      });
    }
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    // Optionally, update the order in the backend here
  }
}
