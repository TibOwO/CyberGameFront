import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; // Adaptez ce chemin si nécessaire
import { RegisterComponent } from './auth/register/register.component'; // Adaptez ce chemin si nécessaire
import { HomeComponent } from './home/home.component'; // Adaptez ce chemin si nécessaire

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    {path: '', component: HomeComponent}

];
