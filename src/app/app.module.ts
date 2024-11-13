import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // autres composants
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Ajoutez ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
