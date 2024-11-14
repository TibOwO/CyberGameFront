// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, // Assurez-vous d'avoir déclaré le composant d'accueil

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importer le module de routage principal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
