import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/do";
import { AlertService } from "./services/alert.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      evt => {},
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          const alertTitle = "Ops!",
            alertText =
              "Infelizmente, o sistema comportou-se de maneira inesperada. Tente realizar a tarefa novamente em alguns minutos.";

          this.alert.warning(alertTitle, alertText, "Fechar");
        }
      }
    );
  }
}
