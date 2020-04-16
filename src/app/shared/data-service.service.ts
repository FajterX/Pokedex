import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	searchValue: Subject<string> = new Subject<string>();

	getsearchValue() {
		return this.searchValue;
	}

	setSearchValue(v: string) {
		this.searchValue.next(v);
	}

	constructor() {}
}
