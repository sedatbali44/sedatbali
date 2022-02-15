import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AccountingService } from '../../services/accounting.service';
import { MoccaService} from '../../services/mocca.service';
import { DdialogComponent } from '../../ddialog/ddialog.component';
import { EdialogComponent } from '../../edialog/edialog.component';

@Component({
  selector: 'app-stammbasics-account',
  templateUrl: './stammbasics-accounting.component.html',
  styleUrls: ['./stammbasics-accounting.component.css']
})
export class StammbasicsAccountingComponent implements OnInit {

  contentLoading = true;
  admin: string;
  vat = [];

  // Festlegen welche Spalten in der Tabelle sichtbar sein sollen
  displayedColumns: string[] = ['edit' , 'nr' , 'name' , 'mwst' , 'typ' , 'del' ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
      this.dataSource.paginator = paginator;
  }

  constructor(private _accountingService: AccountingService,
              private dialog: MatDialog,
              private _moccaService: MoccaService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getBillingAccounts();
    this.getVAT();
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin).admin;
  }

  getBillingAccounts() {
    this._accountingService.getBillingAccounts().subscribe(data => {
      if (data['status'] === 'success') {
        this.dataSource.data = data['data'];
      }
      this.contentLoading = false;
    });
  }

  getVAT() {
    this._moccaService.getVAT().subscribe(data => {
      if (data['status'] === 'success') {
        for (const item in data['data']) {
          if (data['data'].hasOwnProperty(item)) {
            const vatItem = { label: parseInt(data['data'][item], 10).toFixed(2), value: parseInt(data['data'][item], 10).toFixed(2) };
            this.vat.push(vatItem);
          }
        }
      }
    });
  }

  showDeleteDialog(accounting) {
    const dialogRef = this.dialog.open(DdialogComponent, {
      data: { name: accounting.konto_text, id: accounting.konto_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirmDelete(accounting.konto_id) : null;
    });
  }
  confirmDelete(id) {
    this._accountingService.deleteBillingAccount(id).subscribe(data => {
      if (data['status'] === 'success') {
        this.openSnackBar('Konto erfolgreich gelöscht', '');
        this.getBillingAccounts();
      }
    });
  }

  showEditDialogAsAdd(title) {

    const editFields = [
      { inputLabel: 'Nummer', inputType: 'number', index: 'konto_nr', required: true},
      { inputLabel: 'Name', inputType: 'text', index: 'konto_text', required: true },
      {
        inputLabel: 'Mehrwertsteuer',
        inputType: 'select',
        options: this.vat,
        index: 'konto_mwst',
        var: null
      },
      {
        inputLabel: 'Konto Typ',
        inputType: 'select',
        options: [{ label: 'Einlage', value: 'Einlage' }, { label: 'Entnahme', value: 'Entnahme' }, { label: 'Artikel', value: 'Artikel' }],
        index: 'konto_typ',
        var: null
      }
    ];

    const copy = {'konto_nr' : '' , 'konto_text' : '' , 'konto_mwst' : this.vat[1].value, 'konto_typ' : ''};
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: {title, copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmAdd(result); }
    });
  }

  confirmAdd(accounting) {

    const changeEntry = {
      'konto_nr': accounting.konto_nr,
      'konto_text': accounting.konto_text,
      'konto_mwst': parseInt(accounting.konto_mwst, 10),
      'konto_typ': accounting.konto_typ
    };

    this._accountingService.createBillingAccount(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Konto erfolgreich hinzugefügt', '');
        this.getBillingAccounts();
      }
    });
  }

  showEditDialog(accounting) {

    const editFields = [
      { inputLabel: 'Nummer', inputType: 'number', index: 'konto_nr', required: true },
      { inputLabel: 'Name', inputType: 'text', index: 'konto_text', required: true },
      {
        inputLabel: 'Mehrwertsteuer',
        inputType: 'select',
        options: this.vat,
        index: 'konto_mwst'
      },
      {
        inputLabel: 'Konto Typ',
        inputType: 'select',
        options: [{ label: 'Einlage', value: 'Einlage' }, { label: 'Entnahme', value: 'Entnahme' }, { label: 'Artikel', value: 'Artikel' }],
        index: 'konto_typ'
      }
    ];

    const copy = JSON.parse(JSON.stringify(accounting));
    const dialogRef = this.dialog.open(EdialogComponent, {
      data: { title: 'Konto bearbeiten', copy, editFields }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.confirmEdit(result); }
    });
  }

  confirmEdit(accounting) {
    const changeEntry = {
      'konto_id': accounting.konto_id,
      'konto_nr': accounting.konto_nr,
      'konto_text': accounting.konto_text,
      'konto_mwst': parseInt(accounting.konto_mwst, 10),
      'konto_typ': accounting.konto_typ
    };

    this._accountingService.updateBillingAccount(changeEntry).subscribe(result => {
      if (result['status'] === 'success') {
        this.openSnackBar('Konto erfolgreich geändert', '');
        this.getBillingAccounts();
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
