import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';
import {CustomerStatusService} from '../../services/customer-status.service';

@Component({
  selector: 'app-stammbasics-customer-status',
  templateUrl: './stammbasics-customer-status.component.html',
  styleUrls: ['./stammbasics-customer-status.component.css']
})
export class StammbasicsCustomerStatusComponent implements OnInit {

  contentLoading = true;
  admin: string;

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'name' , 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private _customerStatusService: CustomerStatusService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCustomerStatusAll();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getCustomerStatusAll() {
    this._customerStatusService.getCustomerStatusAll({}).subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  showEditDialogAsAdd(title) {

    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'customer_status_name', required: true }
    ];

    const copy = {'customer_status_name' : '' };
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {title, copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(customerStatus) {

    const changeEntry = {
      'customer_status_name': customerStatus.customer_status_name
    };

    this._customerStatusService.createCustomerStatus(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.getCustomerStatusAll();
        this.openSnackBar('Status erfolgreich hinzugefügt', '');
      }
    });
  }

  showEditDialog(customerStatus) {

    const editFields = [
      { inputLabel: 'Name', inputType: 'text', index: 'customer_status_name', required: true }
    ];

    const copy = JSON.parse(JSON.stringify(customerStatus));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'Status bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(customerStatus) {
    const changeEntry = {
      'customer_status_name': customerStatus.customer_status_name,
      'customer_status_id': customerStatus.customer_status_id,
    };

    this._customerStatusService.editCustomerStatus(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.getCustomerStatusAll();
        this.openSnackBar('Status erfolgreich geändert', '');
      }
    });
  }

  showDeleteDialog(customerStatus) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: customerStatus.customer_status_name, id: customerStatus.customer_status_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(customerStatus.customer_status_id) : null;
    });
  }
  confirmDelete(id) {
    this._customerStatusService.setCustomerStatusDeleted(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.getCustomerStatusAll();
        this.openSnackBar('Status erfolgreich gelöscht', '');
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
