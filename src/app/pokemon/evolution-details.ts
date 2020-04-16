import { NamedApiResource } from '../shared/named-api-resource';
import { EvolutionChain } from './evolution-chain';

export interface EvolutionDetails {
	id: number;
	baby_trigger_item: NamedApiResource;
	chain: EvolutionChain;
}
