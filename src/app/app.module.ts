import {HttpUtilService} from './shared/services/http-util.service';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localept, 'pt');
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { PlanosComponent } from './pages/planos/planos.component';

// Services
import { AlertService } from './shared/services/alert.service';

@NgModule({
  declarations: [AppComponent, PlanosComponent, HeaderComponent],
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
  providers: [
    AlertService,
    HttpUtilService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
