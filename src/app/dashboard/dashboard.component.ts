import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { CoreService } from '../core.service';
import { taskservice } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  [x: string]: any;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'assignto',
    'progress',
    'action',
    'Priority',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _taskService: taskservice,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getTask();
  }
  shareInfo(row: any) {
    console.log(row);
  }
  openAddEditTaskForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTask();
        }
      },
    });
  }

  getTask() {
    this._taskService.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Task deleted!', 'done');
        this.getTask();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTask();
        }
      },
    });
  }
}
