import { Injectable, signal } from '@angular/core';
import { PeriodicElement } from './periodic-element.interface';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
  providedIn: 'root',
})
export class ElementStore {
  private readonly _elements = signal<PeriodicElement[]>([]);
  private readonly _loading = signal<boolean>(true);

  readonly elements = this._elements.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.loadData();
  }

  loadData() {
    this._loading.set(true);
    setTimeout(() => {
      this._elements.set([...ELEMENT_DATA]);
      this._loading.set(false);
    }, 1500);
  }

  updateElement(index: number, updated: PeriodicElement) {
  const current = this._elements();
  const currentElement = current[index];

  
  if (currentElement.position === updated.position) {
    const newElements = [...current];
    newElements[index] = updated;
    this._elements.set(newElements);
    return;
  }

  const targetIndex = current.findIndex(e => e.position === updated.position);
  const newElements = [...current];

  if (targetIndex !== -1) {

    const targetElement = { ...newElements[targetIndex], position: currentElement.position };

    newElements[targetIndex] = updated;

    newElements[index] = targetElement;
  } else {
    
    newElements[index] = updated;
  }

  this._elements.set(newElements);
}

}
