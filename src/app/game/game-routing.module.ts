// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { GameComponent } from './game.component';
import { AuthGuard } from '../auth/auth.guard';
import { UniqueEmailComponent } from './email-app/unique-email/unique-email.component';
import { EmailAppComponent } from './email-app/email-app.component';
import { BrowserComponent } from './browser/browser.component';
import { BrowserPageComponent } from './browser/browser-page/browser-page.component';
import { QuizzComponent } from './quizz/quizz.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game/email-app', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game/email/:id', component: UniqueEmailComponent, canActivate: [AuthGuard] },
  { path: 'game/browser', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game/browser/:id', component: BrowserPageComponent, canActivate: [AuthGuard] },
  { path: 'game/quizz', component: QuizzComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
