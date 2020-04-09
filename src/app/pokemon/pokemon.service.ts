import { Injectable } from '@angular/core';
import { IPokemon } from './pokemon';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NamedApiResource } from '../shared/named-api-resource';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	baseUrl: string = 'https://pokeapi.co/api/v2/';

	constructor(private http: HttpClient) {}

	getPokemons(): Observable<NamedApiResource[]> {
		if (localStorage && localStorage.getItem('pokemonsList')) {
			return new Observable<NamedApiResource[]>((observer) => {
				observer.next(JSON.parse(localStorage.getItem('pokemonsList')));
				observer.complete();
			});
		} else {
			this.http
				.get<any>(this.baseUrl + 'pokemon/', { params: { limit: '964' } })
				.pipe(
					map((data) => data.results),
					tap((data) => localStorage.setItem('pokemonsList', JSON.stringify(data)))
				);
		}
	}

	getPokemon(name: string): Observable<IPokemon> {
		let pokemonsMap: Map<string, IPokemon>;
		if (localStorage && !localStorage.getItem('pokemonsMap')) {
			pokemonsMap = new Map();
			localStorage.setItem('pokemonsMap', JSON.stringify(Array.from(pokemonsMap.entries())));
		}

		pokemonsMap = new Map(JSON.parse(localStorage.getItem('pokemonsMap')));

		if (pokemonsMap.get(name)) {
			return new Observable<IPokemon>((observer) => {
				observer.next(pokemonsMap.get(name));
				observer.complete();
			});
		} else {
			return this.http.get<any>(this.baseUrl + 'pokemon/' + name).pipe(
				tap((data) => console.log(data)),
				tap((data) => {
					let pokemon: IPokemon = data;
					console.log('PokemonService -> constructor -> data', pokemon);
					pokemonsMap.set(name, pokemon);
					localStorage.setItem('pokemonsMap', JSON.stringify(Array.from(pokemonsMap.entries())));
				})
			);
		}
	}
}
