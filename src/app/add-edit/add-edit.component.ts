import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { taskservice } from '../task.service';
import { CoreService } from '../core.service';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  taskForm: FormGroup;
  assignto: string[] = ['everone', 'Individual'];
  constructor(
    private _fb: FormBuilder,
    private _taskService: taskservice,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.taskForm = this._fb.group({
      taskName: '',
      Description: '',
      progress: '',
      assignto: '',
      dob: '',
      Priority: '',
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.taskForm.valid) {
      if (this.data) {
        this._taskService
          .updateTask(this.data.id, this.taskForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Task detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._taskService.addTask(this.taskForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Task added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
