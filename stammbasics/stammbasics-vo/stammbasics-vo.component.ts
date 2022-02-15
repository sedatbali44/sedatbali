import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {VoService} from '../../vo.service';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';

@Component({
  selector: 'app-stammbasics-vo',
  templateUrl: './stammbasics-vo.component.html',
  styleUrls: ['./stammbasics-vo.component.css']
})
export class StammbasicsVoComponent implements OnInit {

  contentLoading = true;
  admin: string;

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'nr' , 'text', 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private _voService: VoService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getVO();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getVO() {
    this._voService.getVO().subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  showDeleteDialog(vo) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: vo.vo_nummer, id: vo.vo_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(vo.vo_id) : null;
    });
  }
  confirmDelete(id) {
    this._voService.deleteVo(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.openSnackBar('VO Nummer erfolgreich gelöscht', '');
        this.getVO();
      }
    });
  }

  showEditDialogAsAdd() {

    const editFields = [
        { inputLabel: 'Nummer', inputType: 'number', index: 'vo_nummer', required: true },
        { inputLabel: 'Text', inputType: 'text', index: 'vo_text', required: true }
    ];

    const copy = { };
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {'title' : 'VO Nummer hinzufügen', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(vo) {

    const changeEntry = {
      'text': vo.vo_text,
      'nummer': vo.vo_nummer
    };

    this._voService.addVO(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('VO Nummer erfolgreich hinzugefügt', '');
        this.getVO();
      }
    });
  }

  showEditDialog(vo) {
    const editFields = [
      { inputLabel: 'Nummer', inputType: 'number', index: 'vo_nummer', required: true },
      { inputLabel: 'Text', inputType: 'text', index: 'vo_text', required: true }
    ];

    const copy = JSON.parse(JSON.stringify(vo));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'VO Nummer bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(vo) {
    const changeEntry = {
      'id': vo.vo_id,
      'text': vo.vo_text,
      'nummer': vo.vo_nummer
    };

    this._voService.editVo(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('VO Nummer erfolgreich geändert', '');
        this.getVO();
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
