import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable()
export class HttpUtilService {

  constructor(private router: Router) { }
  private API_URL = environment.API_URL;
  private API_URL_AUTH = environment.API_URL_AUTH;
  private API_UPLOAD = environment.API_UPLOAD;
  private API_UPLOAD_EXCEL = environment.API_UPLOAD_EXCEL;

  urlAuth(path: string) {
    return this.API_URL_AUTH + path;
  }

  url(path: string) {
    return this.API_URL + path;
  }

  urlUpload() {
    return this.API_UPLOAD;
  }

  urlUploadGeneric(path: string) {
    return this.API_UPLOAD_EXCEL + path;
  }

  headersAuth() {
    const headersParams = { "Content-Type": "application/json" };
    if (localStorage["token"]) {
      headersParams["x-access-token"] = localStorage["token"];
    }
    const headers = new Headers(headersParams);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  headers() {
    const headersParams = new Headers({ "Content-Type": "application/json" });
    if (localStorage["token"]) {
      const authToken = localStorage["token"];
      headersParams.append("x-access-token", `${authToken}`);
    }
    const options = new RequestOptions({ headers: headersParams });
    return options;
  }

  extrairDados(response: Response) {
    const data = response.json();
    // console.log(data);
    return data || {};
  }

  processarErros(erro: any) {
    if (erro.status === 401 || erro.status === 403) {
      delete localStorage["user"];
      delete localStorage["token"];
      location.reload();
      this.router.navigate(["/login"]);
    }

    return Observable.throw("Erro acessando servidor remoto.");
  }

}
