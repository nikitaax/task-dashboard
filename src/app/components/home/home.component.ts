import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showCompleted: boolean = false;
  pendingCount: number = 0;
  inProgressCount: number = 0;
  completedCount: number = 0;

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.taskService.getTasks().subscribe((tasks) => {
      this.updateStatusCounts(tasks);
    });
  }

  updateStatusCounts(tasks: Task[]) {
    this.pendingCount = tasks.filter(
      (task) => task.status === 'Pending'
    ).length;
    this.inProgressCount = tasks.filter(
      (t) => t.status === 'In-Progress'
    ).length;
    this.completedCount = tasks.filter(
      (task) => task.status === 'Completed'
    ).length;
  }

  openAddTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      maxWidth: '95vw',
      height: 'auto',
      maxHeight: '90vh',
      autoFocus: true,
      panelClass: 'task-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }
}
