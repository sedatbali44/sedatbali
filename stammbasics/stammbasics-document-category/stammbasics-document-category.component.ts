import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ListsService} from '../../services/lists.service';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';

@Component({
  selector: 'app-stammbasics-document-category',
  templateUrl: './stammbasics-document-category.component.html',
  styleUrls: ['./stammbasics-document-category.component.css']
})
export class StammbasicsDocumentCategoryComponent implements OnInit {

  contentLoading = true;
  admin: string;
  vat = [];

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'name' , 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private _listService: ListsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getDocumentCategories();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getDocumentCategories() {
    this._listService.getListsByCategory('dokumente').subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  showDeleteDialog(list) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: list.liste_text, id: list.liste_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(list.liste_id) : null;
    });
  }
  confirmDelete(id) {
    this._listService.deleteList(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.openSnackBar('Kategorie erfolgreich gelöscht', '');
        this.getDocumentCategories();
      }
    });
  }

  showEditDialogAsAdd(title) {

    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'liste_text', required: true }
    ];

    const copy = {'liste_text' : '' };
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {title, copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(category) {

    const changeEntry = {
      'text': category.liste_text,
      'kat': 'dokumente',
    };

    this._listService.addList(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Kategorie erfolgreich hinzugefügt', '');
        this.getDocumentCategories();
      }
    });
  }

  showEditDialog(category) {

    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'liste_text', required: true }
    ];

    const copy = JSON.parse(JSON.stringify(category));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'Kategorie bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(category) {
    const changeEntry = {
      'id': category.liste_id,
      'text': category.liste_text,
    };

    this._listService.editList(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Kategorie erfolgreich geändert', '');
        this.getDocumentCategories();
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
