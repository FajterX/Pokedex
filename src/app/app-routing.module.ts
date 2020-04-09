import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list.component';

const routes: Routes = [
	{ path: 'pokemon/:name', component: PokemonDetailComponent },
	{ path: 'pokemon', component: PokemonListComponent },
	{ path: '', component: MenuComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
