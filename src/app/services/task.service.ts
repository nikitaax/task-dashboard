import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks);

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
      this.tasksSubject.next(this.tasks);
    }
  }

   private generateId(): number {
    return this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
  }

  addTask(task: Task) {
    const newTask: Task = { ...task, id: this.generateId() };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask, id };
      this.tasksSubject.next(this.tasks);
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  this.tasksSubject.next(this.tasks);
  this.saveTasks();
  }

}
