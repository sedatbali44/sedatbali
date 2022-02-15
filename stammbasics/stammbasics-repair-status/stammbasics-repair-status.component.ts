import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RepairStatusService } from '../../services/repair-status.service';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stammbasics-repair-status',
  templateUrl: './stammbasics-repair-status.component.html',
  styleUrls: ['./stammbasics-repair-status.component.css']
})
export class StammbasicsRepairStatusComponent implements OnInit {

  contentLoading = true;
  admin: string;
  dragKey = 'repstatus_order';
  files: File[] = [];

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'drag', 'reihenfolge', 'text', 'wert', 'icon', 'abgeschlossen', 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private _repairStatusService: RepairStatusService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRepairStatus();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getRepairStatus() {
    this._repairStatusService.getRepairStatus().subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  showDeleteDialog(status) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: status.repstatus_text, id: status.repstatus_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(status.repstatus_id) : null;
    });
  }
  confirmDelete(id) {
    this._repairStatusService.deleteRepairStatus(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.openSnackBar('Reparatur Status erfolgreich gelöscht', '');
        this.getRepairStatus();
      }
    });
  }

  showEditDialogAsAdd() {

    const editFields = [
      { inputLabel: 'Text', inputType: 'text', index: 'repstatus_text', required: true },
      { inputLabel: 'Wert', inputType: 'text', index: 'repstatus_value', required: true}
    ];

    const copy = { };
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {'title' : 'Reparatur Status hinzufügen', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(status) {
    this._repairStatusService.addRepairStatus(status.repstatus_text, status.repstatus_value).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Reparatur Status erfolgreich hinzugefügt', '');
        this.getRepairStatus();
      }
    });
  }

  showEditDialog(vo) {
    const editFields = [
      { inputLabel: 'Text', inputType: 'text', index: 'repstatus_text', required: true },
      { inputLabel: 'Wert', inputType: 'text', index: 'repstatus_value', required: true},
      { inputType: 'dropbox'}
    ];

    const copy = JSON.parse(JSON.stringify(vo));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'Reparatur Status Typ bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(status) {
    const changeEntry = {
      'text': status.repstatus_text,
      'value' : status.repstatus_value,
      'order' : status.repstatus_order,
      'finished' : status.repstatus_abgeschlossen
    };

    if (status.hasOwnProperty('icon')) {
        this.files = status.icon;
        if (this.files.length > 0) {
          console.log('Upload Icon');
          this.upload(status.repstatus_id);
        }
    }

    this._repairStatusService.editRepairStatus(status.repstatus_id, changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Reparatur Status erfolgreich geändert', '');
        this.getRepairStatus();
      }
     });
  }

  orderChange(event: CdkDragDrop<string[]>) {
    const list = [...this.dataSource.data];
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    // tslint:disable-next-line:triple-equals
    if (this.dragKey != '') {
      list.forEach(e => {
        e[this.dragKey] = list.indexOf(e) + 1;
      });
    }
    this.dataSource.data = list;
    this.applyBulk();
  }

  applyBulk() {
    this._repairStatusService.bulkChangeRepairStatus(this.dataSource.data).subscribe(data => {
      this.getRepairStatus();
      this.openSnackBar('Reihenfolge geändert', '');
    });
  }

  toggleFinished(status) {
    status.repstatus_abgeschlossen = status.repstatus_abgeschlossen === 1 ? '0' : '1';
    this.confirmEdit(status);
  }

  deleteIcon(status) {
    const obj = {'icon': status.repstatus_icon, 'repStatusId' : status.repstatus_id};

    this._repairStatusService.deleteIcon(obj).subscribe(data => {
      this.getRepairStatus();
      this.openSnackBar('Icon erfolgreich gelöscht', '');
    });
  }

  // zeigt kleines info Fenster unten an
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  upload(repStatusId) {
    this.readFile(this.files[0]).then(fileContents => {
      const  obj = {data: fileContents, name: this.files[0].name, repStatusId};

      this._repairStatusService.uploadIcon(obj).subscribe(data => {
        if (data['status'] === 'success') {
          this.files.splice(0, 1);
        }
        this.files.splice(0, 1);
        if (this.files.length > 0) {
          this.upload(repStatusId);
        }
      });
    });
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }



}
