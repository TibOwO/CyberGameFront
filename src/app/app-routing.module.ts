// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from './auth/auth.guard';
import { EmailAppComponent } from './game/email-app/email-app.component';
import { VerifMailComponent } from './auth/register/verif-mail/verif-mail.component'; 
import { BrowserComponent } from './game/browser/browser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'game', component: GameComponent}, // canActivate: [AuthGuard] 
  { path: 'game/email-app', component: EmailAppComponent}, //, canActivate: [AuthGuard] },
  { path: 'auth/register/verifmail', component: VerifMailComponent},
  { path: 'game/browser', component: BrowserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
