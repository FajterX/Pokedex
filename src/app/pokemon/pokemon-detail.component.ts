import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from './pokemon';

@Component({
	selector: 'app-pokemon-detail',
	templateUrl: './pokemon-detail.component.html',
	styleUrls: [ './pokemon-detail.component.less' ]
})
export class PokemonDetailComponent implements OnInit {
	@Input() name: string;
	pokemon: IPokemon;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonService.getPokemon(this.name).subscribe((v) => {
			this.pokemon = v;
		});
	}
}
