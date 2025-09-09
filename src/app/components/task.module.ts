import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [TaskFormComponent, TaskCardComponent, TaskListComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule
  ],
  exports: [TaskCardComponent, TaskFormComponent, TaskListComponent],
})
export class TaskModule {}
