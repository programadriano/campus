import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Observable } from 'rxjs';

import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ComercialPlainService {
  private path = 'produtos';

  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  getById(id): Observable<Products> {
    return this.http
      .get(this.httpUtil.url(this.path + '/' + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getAll(): Observable<Products[]> {
    return this.http
      .get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  search(term): Observable<Products[]> {
    return this.http
      .get(
        this.httpUtil.url(this.path + '/admin/search/' + term),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  delete(id): Observable<Products[]> {
    return this.http
      .delete(this.httpUtil.url(this.path + '/' + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  save(vm) {

    const produto = {
      "CodigoBarras": vm.CodigoBarras,
      "Nome": vm.Nome,
      "Preco": vm.Preco
    };    

    return this.http
      .post(this.httpUtil.url(this.path), produto, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  update(vm) {

    const produto = {
      "CodigoBarras": vm.CodigoBarras,
      "Nome": vm.Nome,
      "Preco": vm.Preco
    };

    return this.http
      .put(
        this.httpUtil.url(this.path),
        produto,
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }


}
