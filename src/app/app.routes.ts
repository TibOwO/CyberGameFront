import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; // Adaptez ce chemin si nécessaire
import { RegisterComponent } from './auth/register/register.component'; // Adaptez ce chemin si nécessaire
import { HomeComponent } from './home/home.component'; // Adaptez ce chemin si nécessaire
import { GameComponent } from './game/game.component'; // Adaptez ce chemin si nécessaire
import { AuthGuard } from './auth/auth.guard'; // Adaptez ce chemin si nécessaire
import { EmailAppComponent } from './game/email-app/email-app.component'; // Adaptez ce chemin si nécessaire
import { VerifMailComponent } from './auth/register/verif-mail/verif-mail.component'; 
import { UniqueEmailComponent } from './game/email-app/unique-email/unique-email.component'; // Adaptez ce chemin si nécessaire
import { ConfirmEmailComponent } from './auth/register/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'; // Adaptez ce chemin si nécessaire
import { BrowserComponent } from './game/browser/browser.component'; // Adaptez ce chemin si nécessaire
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PasswordCheckerComponent } from './game/password-checker/password-checker.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: '', component: HomeComponent},
    { path: 'game', component: GameComponent, canActivate: [AuthGuard] },  // Protect game page
    { path: 'game/email-app', component: EmailAppComponent, canActivate: [AuthGuard] },  // Protect email-app page
    { path: 'auth/register/verifmail', component: VerifMailComponent},
    { path: 'game/email/:emailId', component: UniqueEmailComponent, canActivate: [AuthGuard] },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'game/browser', component: BrowserComponent, canActivate: [AuthGuard] },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent },
    { path: 'auth/reset-password', component: ResetPasswordComponent },
    { path: 'game/password-checker', component: PasswordCheckerComponent, canActivate: [AuthGuard] },
];
