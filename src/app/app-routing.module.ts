import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list.component';

const routes: Routes = [
	{ path: 'pokemon/:name', component: PokemonListComponent },
	{ path: 'pokemon', component: PokemonListComponent },
	{ path: '**', redirectTo: 'pokemon' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
