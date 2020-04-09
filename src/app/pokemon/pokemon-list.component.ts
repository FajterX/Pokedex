import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { IPokemon } from './pokemon';
import { NamedApiResource } from '../shared/named-api-resource';

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: [ './pokemon-list.component.less' ]
})
export class PokemonListComponent implements OnInit {
	pokemons: NamedApiResource[];

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonService.getPokemons().subscribe({
			next: (data) => {
				this.pokemons = data;
			}
		});
	}
}
