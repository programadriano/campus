import { LoginModule } from "./login/login.module";
import { BrowserModule } from "@angular/platform-browser";
import { Http, HttpModule } from "@angular/http";
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ScrollDispatchModule} from '@angular/cdk/scrolling'  
import { HttpClientModule } from "@angular/common/http";
import localept from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localept, "pt");
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Modules
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AtlasComponent } from "./pages/atlas/atlas.component";
import { ProjetosComponent } from "./pages/projetos/projetos.component";
import { PlanosComponent } from "./pages/planos/planos.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";


//Services
import { AuthGuard } from "./shared/auth/auth.guard";
import { AlertService } from "./shared/services/alert.service";
import { HomeComponent } from "./pages/home/home.component";
import { BannerComponent } from './pages/home/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AtlasComponent,
    ProjetosComponent,
    PlanosComponent,
    HomeComponent,
    BannerComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpModule,
    HttpClientModule,
    ScrollDispatchModule,
    ReactiveFormsModule

  ],
  providers: [AuthGuard, AlertService, { provide: LOCALE_ID, useValue: "pt" }],

  bootstrap: [AppComponent]
})
export class AppModule {}
