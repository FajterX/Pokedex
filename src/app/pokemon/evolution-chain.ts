import { NamedApiResource } from '../shared/named-api-resource';

export interface EvolutionChain {
	is_baby: boolean;
	species: NamedApiResource;
	evolution_details: {
		item: NamedApiResource;
		trigger: NamedApiResource;
		gender: number;
		held_item: NamedApiResource;
		known_move: NamedApiResource;
		known_move_type: NamedApiResource;
		location: NamedApiResource;
		min_level: number;
		min_happiness: number;
		min_beauty: number;
		min_affection: number;
		needs_overworld_rain: boolean;
		party_species: NamedApiResource;
		party_type: NamedApiResource;
		relative_physical_stats: number;
		time_of_day: string;
		trade_species: NamedApiResource;
		turn_upside_down: boolean;
	}[];
	evolves_to: EvolutionChain[];
}
