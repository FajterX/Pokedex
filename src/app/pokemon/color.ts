import { NamedApiResource } from '../shared/named-api-resource';

export interface IColor {
	id: number;
	name: string;
	names: {
		name: string;
		language: NamedApiResource;
	}[];
	pokemon_species: NamedApiResource[];
}
