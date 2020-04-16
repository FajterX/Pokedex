import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { NamedApiResource } from '../shared/named-api-resource';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data-service.service';
import { Subscription, forkJoin } from 'rxjs';
import { IGeneration } from './generation';
import { IColor } from './color';

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: [ './pokemon-list.component.less' ]
})
export class PokemonListComponent implements OnInit {
	pokemons: NamedApiResource[];
	visiblePokemons: NamedApiResource[] = [];
	activeName: string;
	searchFilter: string = '';
	pokemonObserver: Subscription;
	filteredGenerations: IGeneration[] = [];
	filteredColors: IColor[] = [];
	genHider: boolean = true;
	colorHider: boolean = true;
	visibleFilters: boolean = false;

	generationList = [
		{
			name: 'generation-i',
			checked: false,
			id: 1
		},
		{
			name: 'generation-ii',
			checked: false,
			id: 2
		},
		{
			name: 'generation-iii',
			checked: false,
			id: 3
		},
		{
			name: 'generation-iv',
			checked: false,
			id: 4
		},
		{
			name: 'generation-v',
			checked: false,
			id: 5
		},
		{
			name: 'generation-vi',
			checked: false,
			id: 6
		},
		{
			name: 'generation-vii',
			checked: false,
			id: 7
		}
	];
	colorList = [
		{
			name: 'black',
			checked: false,
			id: 1
		},
		{
			name: 'blue',
			checked: false,
			id: 2
		},
		{
			name: 'brown',
			checked: false,
			id: 3
		},
		{
			name: 'gray',
			checked: false,
			id: 4
		},
		{
			name: 'green',
			checked: false,
			id: 5
		},
		{
			name: 'pink',
			checked: false,
			id: 6
		},
		{
			name: 'purple',
			checked: false,
			id: 7
		},
		{
			name: 'red',
			checked: false,
			id: 9
		},
		{
			name: 'white',
			checked: false,
			id: 9
		},
		{
			name: 'yellow',
			checked: false,
			id: 10
		}
	];

	constructor(
		private pokemonService: PokemonService,
		private route: ActivatedRoute,
		private dataService: DataService
	) {}

	ngOnInit(): void {
		this.pokemonObserver = this.pokemonService.getPokemons().subscribe({
			next: (data) => {
				this.pokemons = data;
				this.activeName = this.route.snapshot.paramMap.get('name');

				if (this.activeName) this.visiblePokemons.push(this.pokemons.find((p) => p.name === this.activeName));

				this.visiblePokemons = this.visiblePokemons.concat(
					this.pokemons.slice(0, 10).filter((p) => p.name !== this.activeName)
				);

				this.route.params.subscribe((val) => (this.activeName = val.name));
			}
		});

		this.dataService.getsearchValue().subscribe({
			next: (v) => {
				this.searchFilter = v;
				this.visiblePokemons = this.performFilter().slice(0, 10);
			}
		});
	}

	onScroll(event: any): void {
		let max = event.target.scrollHeight;
		let pos = event.target.scrollTop + event.target.offsetHeight;
		if (max - pos < 150) {
			this.visiblePokemons = this.visiblePokemons.concat(
				this.performFilter().slice(this.visiblePokemons.length, this.visiblePokemons.length + 5)
			);
		}
	}

	toggleCheck(name: string, list: any): void {
		for (let i = 0; i < list.length; i++) {
			if (list[i].name === name) {
				list[i].checked = !list[i].checked;
				break;
			}
		}
	}

	applyFilter() {
		let generationSubscriptions = [];
		let colorSubscriptions = [];
		this.filteredGenerations = [];
		this.filteredColors = [];

		this.generationList.filter((g) => g.checked).forEach((g) => {
			generationSubscriptions.push(this.pokemonService.getGenerationPokemon(g.id));
		});
		this.colorList.filter((g) => g.checked).forEach((g) => {
			colorSubscriptions.push(this.pokemonService.getColorPokemon(g.id));
		});

		if (generationSubscriptions.length || colorSubscriptions.length) {
			forkJoin(...generationSubscriptions, ...colorSubscriptions).subscribe((results) => {
				this.filteredGenerations = results.filter((r) => r.name.startsWith('generation'));
				this.filteredColors = results.filter((r) => !r.name.startsWith('generation'));
				this.visiblePokemons = this.performFilter().slice(0, 10);
			});
		} else {
			this.visiblePokemons = this.performFilter().slice(0, 10);
		}
	}

	performFilter(): NamedApiResource[] {
		let pokemons = this.pokemons;
		pokemons = pokemons.filter((pokemon) => pokemon.name.startsWith(this.searchFilter));
		if (this.filteredGenerations.length) {
			pokemons = pokemons.filter((p) => {
				for (let i = 0; i < this.filteredGenerations.length; i++) {
					for (let j = 0; j < this.filteredGenerations[i].pokemon_species.length; j++) {
						if (this.filteredGenerations[i].pokemon_species[j].name === p.name) {
							return true;
						}
					}
				}
				return false;
			});
		}
		if (this.filteredColors.length) {
			pokemons = pokemons.filter((p) => {
				for (let i = 0; i < this.filteredColors.length; i++) {
					for (let j = 0; j < this.filteredColors[i].pokemon_species.length; j++) {
						if (this.filteredColors[i].pokemon_species[j].name === p.name) {
							return true;
						}
					}
				}
				return false;
			});
		}

		return pokemons;
	}

	ngOnDestroy(): void {
		this.pokemonObserver.unsubscribe();
	}
}
