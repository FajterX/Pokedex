import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonBtnComponent } from './pokemon-btn.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinPipe } from '../shared/join.pipe';
import { MultiplyPipe } from '../shared/multiply.pipe';

@NgModule({
	declarations: [ PokemonListComponent, PokemonDetailComponent, PokemonBtnComponent, JoinPipe, MultiplyPipe ],
	imports: [ CommonModule, RouterModule, BrowserAnimationsModule ]
})
export class PokemonModule {}
