// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { EmailAppComponent } from './game/email-app/email-app.component';
import { VerifMailComponent } from './auth/register/verif-mail/verif-mail.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    EmailAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importer le module de routage principal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
