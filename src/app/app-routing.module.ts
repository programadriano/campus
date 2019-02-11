import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanosComponent } from './pages/planos/planos.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: PlanosComponent,
  },
  { path: '**', redirectTo: '/produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
