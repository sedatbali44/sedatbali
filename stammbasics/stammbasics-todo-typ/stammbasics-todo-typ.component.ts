import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TodoTypeService} from '../../services/todo-type.service';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';

@Component({
  selector: 'app-stammbasics-todo-typ',
  templateUrl: './stammbasics-todo-typ.component.html',
  styleUrls: ['./stammbasics-todo-typ.component.css']
})
export class StammbasicsTodoTypComponent implements OnInit {

  contentLoading = true;
  admin: string;

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'name', 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private _todoTypeService: TodoTypeService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTypes();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getTypes() {
    this._todoTypeService.getTodoTypes().subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  showDeleteDialog(type) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: type.todo_typ_name, id: type.todo_typ_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(type.todo_typ_id) : null;
    });
  }
  confirmDelete(id) {
    this._todoTypeService.deleteTodoType(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.openSnackBar('Todo Typ erfolgreich gelöscht', '');
        this.getTypes();
      }
    });
  }

  showEditDialogAsAdd() {

    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'todo_typ_name', required: true }
    ];

    const copy = { };
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {'title' : 'Todo Typ hinzufügen', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(type) {
    this._todoTypeService.addTodoType(type.todo_typ_name).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Todo Typ erfolgreich hinzugefügt', '');
        this.getTypes();
      }
    });
  }

  showEditDialog(vo) {
    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'todo_typ_name', required: true }
    ];

    const copy = JSON.parse(JSON.stringify(vo));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'Todo Typ bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(type) {
    const changeEntry = {
      'name': type.todo_typ_name
    };

    this._todoTypeService.editTodoType(type.todo_typ_id, changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Todo Typ erfolgreich geändert', '');
        this.getTypes();
      }
    });
  }

  // zeigt kleines info Fenster unten an
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
