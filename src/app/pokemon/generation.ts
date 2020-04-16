import { NamedApiResource } from '../shared/named-api-resource';

export interface IGeneration {
	id: number;
	name: string;
	abilities: NamedApiResource[];
	names: {
		name: string;
		language: NamedApiResource;
	}[];
	main_region: NamedApiResource;
	moves: NamedApiResource[];
	pokemon_species: NamedApiResource[];
	types: NamedApiResource[];
	version_groups: NamedApiResource[];
}
