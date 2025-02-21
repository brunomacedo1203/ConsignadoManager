import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component'; // Importando o AppComponent standalone
import { routes } from './app/app-routing.module'; // Importando as rotas diretamente

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // Passando as rotas diretamente
  ]
})
  .catch((err) => console.error(err));
