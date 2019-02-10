import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AtlasComponent } from "./pages/atlas/atlas.component";
import { ProjetosComponent } from "./pages/projetos/projetos.component";
import { PlanosComponent } from "./pages/planos/planos.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./shared/auth/auth.guard";

const routes: Routes = [
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  {
    path: "dashboard",
    component: DashboardComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: "editar-home",
    component: HomeComponent,
  //  canActivate: [AuthGuard]
  },

  {
    path: "atlas",
    component: AtlasComponent,
   // canActivate: [AuthGuard]
  },

  {
    path: "projetos",
    component: ProjetosComponent,
  //  canActivate: [AuthGuard]
  },

  {
    path: "planos",
    component: PlanosComponent,
   // canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
