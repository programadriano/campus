import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Observable } from 'rxjs';

import { ComercialPlain } from '../models/comercialPlain';

@Injectable({
  providedIn: 'root'
})
export class ComercialPlainService {
  private path = 'produtos';

  constructor(private http: Http, private httpUtil: HttpUtilService) {}

  getById(id): Observable<ComercialPlain> {
    return this.http
      .get(this.httpUtil.url(this.path + '/' + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getAll(): Observable<ComercialPlain[]> {
    return this.http
      .get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getTotal(): Observable<Object> {
    return this.http
      .get(
        this.httpUtil.url(this.path + '/total/comercialplain'),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  search(term): Observable<ComercialPlain[]> {
    return this.http
      .get(
        this.httpUtil.url(this.path + '/admin/search/' + term),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  delete(id): Observable<ComercialPlain[]> {
    return this.http
      .delete(this.httpUtil.url(this.path + '/' + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  save(planos) {
    const comercial = {
      // "editoria": planos.title,
    };

    return this.http
      .post(this.httpUtil.url(this.path), comercial, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  update(id, planos) {
    const comercial = {
      // "editoria": planos.title,
    };

    return this.http
      .put(
        this.httpUtil.url(this.path + '/' + id),
        comercial,
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }


}
