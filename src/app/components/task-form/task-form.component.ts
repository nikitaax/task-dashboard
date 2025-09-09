import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  myTaskForm!: FormGroup;
  minDate!: Date;

  ngOnInit(): void {
    this.minDate = new Date();
    this.myTaskForm = this.fb.group({
      title: [this.data?.title || ''],
      description: [this.data?.description || ''],
      status: [this.data?.status || 'Pending'],
      dueDate: [this.data?.dueDate || ''],
    });
  }

  onSubmit() {
    if (this.myTaskForm.valid) {
      this.dialogRef.close(this.myTaskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
