import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IPokemon } from './pokemon';
import { PokemonService } from './pokemon.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { IPokemonSpecies } from './pokemon-species';
import { EvolutionDetails } from './evolution-details';

@Component({
	selector: 'app-pokemon-btn',
	templateUrl: './pokemon-btn.component.html',
	styleUrls: [ './pokemon-btn.component.less' ],
	animations: [
		trigger('inOutAnimation', [
			transition(':enter', [ style({ height: 0 }), animate('0.5s ease-out') ]),
			transition(':leave', [ style({}), animate('0.5s ease-out'), style({ height: 0, border: 0 }) ])
		])
	]
})
export class PokemonBtnComponent implements OnInit {
	@Input() name: string;
	@Input() active: boolean;
	@Input() index: number;
	pokemon: IPokemon;
	species: IPokemonSpecies;
	evolution: EvolutionDetails;
	evolutionSnippet: any[];
	pokemonObserver: Subscription;
	speciesObserver: Subscription;
	selectedInfo: number = 1;
	flavorText: string;
	height: number;
	visibleMoves: any[];

	colors = {
		green: '#62c162',
		red: '#ff9268',
		blue: '#8c9fff',
		white: '#e9e2ef',
		brown: '#c8764f',
		yellow: '#fff46f',
		purple: '#e6bee6',
		pink: '#ffd4dc',
		gray: '#bdbdbd',
		black: '#626262'
	};

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonObserver = this.pokemonService.getPokemon(this.name).subscribe({
			next: (pokemon) => {
				this.speciesObserver = this.pokemonService.getPokemonSpecies(pokemon.species.name).subscribe({
					next: (species) => {
						this.species = species;
						this.flavorText = species.flavor_text_entries.find((v) => v.language.name === 'en').flavor_text;
						this.pokemon = pokemon;
						this.height = pokemon.height * 10;
						this.visibleMoves = this.pokemon.moves.filter(
							(m) =>
								m.version_group_details.find((v) => v.move_learn_method.name === 'level-up') !==
								undefined
						);
						this.visibleMoves.forEach((m) => {
							m.version_group_details = [].concat(
								m.version_group_details.find((v) => v.move_learn_method.name === 'level-up')
							);
						});

						if (this.active) this.loadEvolutions();
					}
				});
			}
		});
	}

	onNavClicked(selected: number): void {
		this.selectedInfo = selected;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.active && changes.active.currentValue === true && this.species && this.evolution === undefined)
			this.loadEvolutions();
	}

	ngOnDestroy(): void {
		if (this.speciesObserver) this.speciesObserver.unsubscribe();
		if (this.pokemonObserver) this.pokemonObserver.unsubscribe();
	}

	loadEvolutions(): void {
		this.pokemonService
			.getPokemonEvolutionChain((this.species.evolution_chain as { url: string }).url, this.pokemon.name)
			.subscribe((data: any) => {
				this.evolution = data;
				this.evolutionSnippet = [];
				this.evolutionSnippet.push(new Array());
				this.evolutionSnippet[0].push(data.chain.species.name);
				if (data.chain.evolves_to.length) {
					this.evolutionSnippet.push(data.chain.evolves_to.map((v) => v.species.name));
					let thirdEvolution = [];
					data.chain.evolves_to.forEach((v) => {
						thirdEvolution = thirdEvolution.concat(v.evolves_to.map((v) => v.species.name));
					});

					if (thirdEvolution.length) this.evolutionSnippet.push(thirdEvolution);
				}
			});
	}
}
