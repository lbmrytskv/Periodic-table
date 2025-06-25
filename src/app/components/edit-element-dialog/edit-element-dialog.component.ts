import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PeriodicElement } from '../periodic-table/periodic-element.interface';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-element-dialog.component.html',
})
export class EditElementDialogComponent {
  editedElement: PeriodicElement;

  constructor(
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    this.editedElement = { ...data };
  }

  save() {
    this.dialogRef.close(this.editedElement);
  }

  cancel() {
    this.dialogRef.close();
  }
}
