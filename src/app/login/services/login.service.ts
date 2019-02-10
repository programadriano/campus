import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Token } from "@angular/compiler";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
// import 'rxjs/add/operator/tap';

import { HttpUtilService } from "src/app/shared/services/http-util.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private loginUrl = "token/request ";
  private IsUserLogged = false;
  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  logIn(user, password): Observable<Token> {
    let url = this.httpUtil.urlAuth(this.loginUrl);
    let body = "username=" + user + "&password=" + password + "&grant_type=password";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(url, body, options)
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  UserLogged() {
    return this.IsUserLogged;
  }

  logOut() {
    delete localStorage["user"];
    delete localStorage["role"];
    delete localStorage["token"];
  }

  logado() {
    return localStorage["token"];
  }
}
