import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class AppComponent implements OnInit {
  currentUser: any;
  isUserLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isUserLoggedIn = !!user;
      console.log('Usuário atualizado:', user);
    });
  }

  ngOnInit() {
    // Verifica se o usuário já está logado no início
    if (this.authService.currentUserValue) {
      this.isUserLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.isUserLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
