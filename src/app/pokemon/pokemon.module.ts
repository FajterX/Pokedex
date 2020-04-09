import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [ PokemonListComponent, PokemonDetailComponent ],
	imports: [ CommonModule ]
})
export class PokemonModule {}
