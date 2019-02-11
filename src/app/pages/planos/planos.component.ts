import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ComercialPlainService } from 'src/app/services/comercial-plain.service';
import { ComercialPlain } from 'src/app/models/comercialPlain';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {
  public obj: any;
  public comercialPlain: ComercialPlain[];
  public comercialP: ComercialPlain;

  constructor(
    private comercialPlainService: ComercialPlainService,
    private alertService: AlertService,
    private http: HttpClient,
    private _router: Router
  ) {
    this.comercialP = new ComercialPlain();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.comercialPlainService
      .getAll()
      .pipe(take(1))
      .subscribe(
        data => {
          this.obj = data;
          this.comercialPlain = this.obj;
        },
        err => {
          console.log(err);
        }
      );
  }

  delete(id, title) {
    this.alertService
      .question('', `Deseja realmente deletar esse ${title}?`, 'OK', 'Não')
      .then(willDelete => {
        if (willDelete.value !== undefined) {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  update() {}

  save() {}

  cbSaveSuccess(response) {
    return this.alertService.success('', 'Plano enviado com sucesso', 'OK');
  }

  cbHandlerError(error) {
    return this.alertService.error(
      'Erro',
      'Ocorreu um erro ao cadastrar o Plano',
      'OK'
    );
  }

  upHandlerError() {
    return this.alertService.error(
      'Erro',
      'Ocorreu um erro ao fazer upload de arquivo',
      'OK'
    );
  }
}
