// app.module.ts
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { EmailAppComponent } from './game/email-app/email-app.component';
import { BrowserComponent } from './game/browser/browser.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './auth/services/auth.service'; // Importer AuthService
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importez le module d'animation
import { ToastrModule } from 'ngx-toastr';  // Importez le module ngx-toastr
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { QuizzComponent } from './game/quizz/quizz.component';
import { EmailSecurityComponent } from './game/wiki/email-security/email-security.component';
import { WebSecurityComponent } from './game/wiki/web-security/web-security.component';
import { MobileSecurityComponent } from './game/wiki/mobile-security/mobile-security.component';
import { SidebarComponent } from './game/wiki/sidebar/sidebar.component';
import { WikiComponent } from './game/wiki/wiki.component';


@NgModule({
  declarations: [
   // AppComponent,
  //  HomeComponent,
  //  GameComponent,
  //  EmailAppComponent,
  //  BrowserComponent,
  // QuizzComponent
 
    //SidebarComponent,  // Déclarez le composant Sidebar ici
  ],
  imports: [
    EmailSecurityComponent,
    WebSecurityComponent,
    MobileSecurityComponent,
    BrowserModule,
    BrowserAnimationsModule,  // Importer le module d'animation
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // Configurer ngx-toastr ic    // Configurez ngx-toastr
    AppRoutingModule, // Importer le module de routage principal
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Ajouter l'intercepteur
  ],
  bootstrap: []
})
export class AppModule { }
