import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() showCompleted: boolean = false;

  private sortOrderSubject = new BehaviorSubject<'asc' | 'desc'>('asc');
  sortOrder$ = this.sortOrderSubject.asObservable();

  tasks$!: Observable<Task[]>;
  filteredTasks$!: Observable<Task[]>;

  filterControl = new FormControl('All');

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.tasks$ = this.taskService.getTasks();

    this.route.data.subscribe((data) => {
      this.showCompleted = data['completedOnly'] || false;
    });

    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filterControl.valueChanges.pipe(startWith('All')),
      this.sortOrder$,
    ]).pipe(
      map(([tasks, filter, sortOrder]) => {
        let filtered =
          filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

        if (this.showCompleted) {
          filtered = filtered.filter((t) => t.status === 'Completed');
        }

        return filtered.sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
      })
    );
  }

  toggleSort() {
    const current = this.sortOrderSubject.value;
    this.sortOrderSubject.next(current === 'asc' ? 'desc' : 'asc');
  }
}
