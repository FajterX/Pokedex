import { Component } from '@angular/core';
import { DataService } from './shared/data-service.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.less' ]
})
export class AppComponent {
	title = 'Pokedex';
	_searchValue: string = '';

	get searchValue(): string {
		return this._searchValue;
	}

	set searchValue(v: string) {
		this._searchValue = v;
		this.dataService.setSearchValue(v.toLocaleLowerCase());
	}

	constructor(private dataService: DataService) {}
}
