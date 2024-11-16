// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { EmailAppComponent } from './game/email-app/email-app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './auth/services/auth.service'; // Importer AuthService
import { HTTP_INTERCEPTORS } from '@angular/common/http';
 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    EmailAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importer le module de routage principal
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Ajouter l'intercepteur
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
