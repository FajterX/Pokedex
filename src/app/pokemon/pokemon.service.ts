import { Injectable } from '@angular/core';
import { IPokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedApiResource } from '../shared/named-api-resource';
import { IPokemonSpecies } from './pokemon-species';
import { EvolutionDetails } from './evolution-details';
import { EvolutionChain } from './evolution-chain';
import { IGeneration } from './generation';
import { IColor } from './color';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	baseUrl: string = 'https://pokeapi.co/api/v2/';
	pokemonsMap: Map<string, IPokemon> = new Map<string, IPokemon>();
	generationMap: Map<number, IGeneration> = new Map<number, IGeneration>();
	colorMap: Map<number, IColor> = new Map<number, IColor>();

	constructor(private http: HttpClient) {}

	getPokemons(): Observable<NamedApiResource[]> {
		if (localStorage && localStorage.getItem('pokemonsList')) {
			return new Observable<NamedApiResource[]>((observer) => {
				observer.next(JSON.parse(localStorage.getItem('pokemonsList')));
				observer.complete();
			});
		} else {
			return this.http
				.get<any>(this.baseUrl + 'pokemon/', { params: { limit: '964' } })
				.pipe(
					map((data) => data.results),
					tap((data: NamedApiResource[]) => localStorage.setItem('pokemonsList', JSON.stringify(data)))
				);
		}
	}

	getPokemon(name: string): Observable<IPokemon> {
		if (this.pokemonsMap.get(name)) {
			return new Observable<IPokemon>((observer) => {
				observer.next(this.pokemonsMap.get(name));
				observer.complete();
			});
		} else {
			return this.http.get<IPokemon>(this.baseUrl + 'pokemon/' + name).pipe(
				tap((data) => {
					if (data !== null) {
						let pokemon: IPokemon = data;
						this.pokemonsMap.set(name, pokemon);
					}
				})
			);
		}
	}

	getPokemonSpecies(name: string): Observable<IPokemonSpecies> {
		if (this.pokemonsMap.get(name) && !this.isNamedApiResource(this.pokemonsMap.get(name).species)) {
			return new Observable<IPokemonSpecies>((observer) => {
				observer.next(this.pokemonsMap.get(name).species as IPokemonSpecies);
				observer.complete();
			});
		} else {
			return this.http.get<IPokemonSpecies>(this.baseUrl + 'pokemon-species/' + name).pipe(
				tap((data) => {
					data.varieties.forEach((v) => {
						let pokemon = this.pokemonsMap.get(v.pokemon.name);
						if (pokemon !== undefined) {
							pokemon.species = data;
							this.pokemonsMap.set(name, pokemon);
						}
					});
				})
			);
		}
	}

	getPokemonEvolutionChain(url: string, name: string): Observable<EvolutionDetails> {
		if (
			this.pokemonsMap.get(name) &&
			!this.isNamedApiResource(this.pokemonsMap.get(name).species) &&
			!this.isNamedApiResource((this.pokemonsMap.get(name).species as IPokemonSpecies).evolution_chain)
		) {
			return new Observable<EvolutionDetails>((observer) => {
				observer.next((this.pokemonsMap.get(name).species as IPokemonSpecies)
					.evolution_chain as EvolutionDetails);
				observer.complete();
			});
		} else {
			return this.http.get<EvolutionDetails>(url).pipe(
				tap((data) => {
					this.updateEvolution(data, data.chain);
				})
			);
		}
	}

	getGenerationPokemon(id: number): Observable<IGeneration> {
		if (this.generationMap.get(id)) {
			return new Observable<IGeneration>((observer) => {
				observer.next(this.generationMap.get(id));
				observer.complete();
			});
		} else {
			return this.http.get<IGeneration>(this.baseUrl + 'generation/' + id).pipe(
				tap((data) => {
					this.generationMap.set(id, data);
				})
			);
		}
	}

	getColorPokemon(id: number): Observable<IColor> {
		if (this.colorMap.get(id)) {
			return new Observable<IColor>((observer) => {
				observer.next(this.colorMap.get(id));
				observer.complete();
			});
		} else {
			return this.http.get<IColor>(this.baseUrl + 'pokemon-color/' + id).pipe(
				tap((data) => {
					this.colorMap.set(id, data);
				})
			);
		}
	}

	isNamedApiResource(v: NamedApiResource | Object): v is NamedApiResource {
		return (v as NamedApiResource).url !== undefined;
	}

	updateEvolution(detail: EvolutionDetails, chain: EvolutionChain): void {
		let pokemon = this.pokemonsMap.get(chain.species.name);
		if (pokemon && !this.isNamedApiResource(pokemon.species)) {
			(pokemon.species as IPokemonSpecies).evolution_chain = detail;
			this.pokemonsMap.set(chain.species.name, pokemon);
			for (let i = 0; i < (chain.evolves_to as any).length; i++) {
				const element = chain.evolves_to[i];
				this.updateEvolution(detail, element);
			}
		}
	}
}
