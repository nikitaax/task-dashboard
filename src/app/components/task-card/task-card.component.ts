import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task!: Task;
  
  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  editTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { ...this.task }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(this.task.id, result);
        console.log('Task updated:', result);
      }
    });
  }

  deleteTask() {
    if(confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id);
    }
  }

}
