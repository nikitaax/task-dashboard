import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'completed-tasks',
        component: TaskListComponent,
        data: { completedOnly: true },
      },
      { path: 'all-tasks', component: TaskListComponent },
      { path: '', redirectTo: 'all-tasks', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
