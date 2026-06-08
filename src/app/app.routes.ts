import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '**', redirectTo: '' }
];
