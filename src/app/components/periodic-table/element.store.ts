import { Injectable, signal, computed } from '@angular/core';
import { PeriodicElement } from './periodic-element.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private readonly _filter = signal<string>('');

  readonly loading = this._loading.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly elements = computed(() => {
    const filterText = this._filter().toLowerCase().trim();
    const data = this._elements();

    if (!filterText) return data;

    return data.filter(el =>
      el.position.toString().includes(filterText) ||
      el.name.toLowerCase().includes(filterText) ||
      el.weight.toString().includes(filterText) ||
      el.symbol.toLowerCase().includes(filterText)
    );
  });

  private debounceSubject = new Subject<string>();

  constructor() {
    this.loadData();

    this.debounceSubject
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(value => this._filter.set(value));
  }

  setFilter(value: string) {
    this.debounceSubject.next(value);
  }

  loadData() {
    this._loading.set(true);
    setTimeout(() => {
      this._elements.set([...ELEMENT_DATA]);
      this._loading.set(false);
    }, 1500);
  }

  updateElement(index: number, updated: PeriodicElement) {
    const current = [...this._elements()];
    const currentElement = current[index];

    if (currentElement.position === updated.position) {
      current[index] = { ...updated };
    } else {
      const swapIndex = current.findIndex(
        el => el.position === updated.position
      );

      if (swapIndex !== -1) {
        
        const temp = { ...current[swapIndex], position: currentElement.position };
        current[swapIndex] = { ...updated };
        current[index] = temp;
      } else {
      
        current[index] = { ...updated };
      }
    }

    this._elements.set(current);
  }
}
