import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; // Adaptez ce chemin si nécessaire
import { RegisterComponent } from './auth/register/register.component'; // Adaptez ce chemin si nécessaire
import { HomeComponent } from './home/home.component'; // Adaptez ce chemin si nécessaire
import { GameComponent } from './game/game.component'; // Adaptez ce chemin si nécessaire
import { AuthGuard } from './auth/auth.guard'; // Adaptez ce chemin si nécessaire
import { EmailAppComponent } from './game/email-app/email-app.component'; // Adaptez ce chemin si nécessaire
import { VerifMailComponent } from './auth/register/verif-mail/verif-mail.component'; 
import { UniqueEmailComponent } from './game/email-app/unique-email/unique-email.component'; // Adaptez ce chemin si nécessaire

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: '', component: HomeComponent},
    { path: 'game', component: GameComponent, canActivate: [AuthGuard] },  // Protect game page
    { path: 'game/email-app', component: EmailAppComponent, canActivate: [AuthGuard] },  // Protect email-app page
    { path: 'auth/register/verifmail', component: VerifMailComponent},
    { path: 'game/email/:emailId', component: UniqueEmailComponent, canActivate: [AuthGuard] }


];
