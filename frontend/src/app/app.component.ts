import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterOutlet,
      LoginComponent,
      NavbarComponent,
      CommonModule,
      RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  navBar = true;

  constructor(private router:Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.navBar = event.url !== '/login';
      }
    });
  }
}
