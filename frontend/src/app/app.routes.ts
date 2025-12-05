import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
import { CadastroPetComponent } from './cadastro-pet/cadastro-pet.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'cadastro-pet', component: CadastroPetComponent, canActivate: [authGuard] },
    { path: 'favoritos', component: FavoritosComponent, canActivate: [authGuard] },
    { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];