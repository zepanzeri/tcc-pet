import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'configuracoes', component: ConfiguracoesComponent },
    { path: '**', redirectTo: 'login' }
];