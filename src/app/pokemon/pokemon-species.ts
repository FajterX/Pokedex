import { NamedApiResource } from '../shared/named-api-resource';
import { EvolutionDetails } from './evolution-details';

export interface IPokemonSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: NamedApiResource;
	pokedex_numbers: {
		entry_number: number;
		pokedex: NamedApiResource;
	}[];
	egg_groups: NamedApiResource[];
	color: NamedApiResource;
	shape: NamedApiResource;
	evolves_from_species: NamedApiResource;
	evolution_chain: { url: string } | EvolutionDetails;
	habitat: NamedApiResource;
	generation: NamedApiResource;
	names: {
		name: string;
		language: NamedApiResource;
	}[];
	pal_park_encounters: {
		base_score: number;
		rate: number;
		area: NamedApiResource;
	}[];
	flavor_text_entries: {
		flavor_text: string;
		language: NamedApiResource;
		version: NamedApiResource;
	}[];
	form_descriptions: {
		description: string;
		language: NamedApiResource;
	}[];
	genera: {
		genus: string;
		language: NamedApiResource;
	}[];
	varieties: {
		is_default: boolean;
		pokemon: NamedApiResource;
	}[];
}
