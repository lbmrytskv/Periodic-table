import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';           
import { PeriodicElement } from './periodic-element.interface';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import { ElementStore } from './element.store';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,        
    MatInputModule,           
    EditElementDialogComponent
  ],
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  get dataSource() {
    return this.store.elements();
  }

  get isLoading() {
    return this.store.loading();
  }

  constructor(public store: ElementStore, private dialog: MatDialog) {} 

  openEditDialog(element: PeriodicElement, index: number) {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElement | undefined) => {
      if (result) {
        this.store.updateElement(index, result);
      }
    });
  }
}
