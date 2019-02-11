import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { VMessageComponent } from './components/v-message/v-message.component';
import { InputValidateComponent } from './components/input-validate/input-validate.component';
import { AlertService } from './services/alert.service';
import { ResponseInterceptor } from './response.interceptor';
import { HttpUtilService } from './services/http-util.service';


@NgModule({
  declarations: [VMessageComponent, InputValidateComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [VMessageComponent, ReactiveFormsModule, FormsModule, InputValidateComponent],
  providers: [
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {}
