import { NamedApiResource } from '../shared/named-api-resource';
import { IPokemonSpecies } from './pokemon-species';

export interface IPokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: {
		ability: NamedApiResource;
		is_hidden: boolean;
		slot: number;
	}[];
	forms: NamedApiResource;
	game_indices: {
		game_index: number;
		version: NamedApiResource;
	}[];
	held_items: {
		item: NamedApiResource;
		version_details: {
			rarity: number;
			version: NamedApiResource;
		}[];
	}[];
	location_area_encounters: {
		location_area: NamedApiResource;
		version_details: {
			max_chance: number;
			encounter_details: {
				min_level: number;
				max_level: number;
				condition_values: NamedApiResource;
				chance: number;
				method: NamedApiResource;
			}[];
			version: NamedApiResource;
		}[];
	}[];
	moves: {
		move: NamedApiResource;
		version_group_details: {
			level_learned_at: number;
			version_group: NamedApiResource;
			move_learn_method: NamedApiResource;
		}[];
	}[];
	sprites: {
		back_female: string;
		back_shiny_female: string;
		back_default: string;
		front_female: string;
		front_shiny_female: string;
		back_shiny: string;
		front_default: string;
		front_shiny: string;
	};
	species: NamedApiResource | IPokemonSpecies;
	stats: {
		base_stat: number;
		effort: number;
		stat: NamedApiResource;
	}[];
	types: {
		slot: number;
		type: NamedApiResource;
	}[];
}
