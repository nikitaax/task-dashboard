import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(
    this.tasks
  );

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasksData = localStorage.getItem('tasks');
    if (tasksData) {
      this.tasks = JSON.parse(tasksData);
    } else {
      // ✅ Seed with sample tasks for first-time users
      this.tasks = [
        {
          id: 1,
          title: 'Go for a walk',
          description: 'Walk in the park for 30 minutes with my dog',
          status: 'Pending',
          dueDate: new Date(),
        },
        {
          id: 2,
          title: 'Add Background Image to App',
          description:
            'Find a suitable dark background image and set it, ensure all buttons are visible',
          status: 'Completed',
          dueDate: new Date(Date.now() + 86400000),
        },
        {
          id: 3,
          title: 'Deploy My App',
          description: 'Push Angular app and verify deployment',
          status: 'In-Progress',
          dueDate: new Date(Date.now() + 86400000),
        },
      ];
      this.saveTasks();
    }

    this.tasksSubject.next(this.tasks);
  }

  private generateId(): number {
    return this.tasks.length ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
  }

  addTask(task: Task) {
    const newTask: Task = { ...task, id: this.generateId() };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask, id };
      this.tasksSubject.next(this.tasks);
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }
}
