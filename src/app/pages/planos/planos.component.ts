import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ComercialPlainService } from 'src/app/services/comercial-plain.service';
import { Products } from 'src/app/models/products';
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
  public products: Products[];
  public product: Products;

  constructor(
    private comercialPlainService: ComercialPlainService,
    private alertService: AlertService
  ) {
    this.product = new Products();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.comercialPlainService
      .getAll()
      .subscribe(
        data => {
          this.obj = data;
          this.products = this.obj;
        },
        err => {
          console.log(err);
        }
      );
  }

  getById(codigoBarras) {
    this.comercialPlainService
      .getById(codigoBarras)
      .subscribe(
        data => {
          this.obj = data;
          this.product = this.obj;
        },
        err => {
          console.log(err);
        }
      );
  }

  delete(id, nome) {
    this.alertService
      .question('', `Deseja realmente deletar esse ${nome}?`, 'OK', 'Não')
      .then(willDelete => {
        if (willDelete.value !== undefined) {

        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  sendForm(codigoBarras, nome, preco) {
    this.product.CodigoBarras = codigoBarras == "" ? Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) : codigoBarras;
    this.product.Nome = nome;
    this.product.Preco = preco;


    if (codigoBarras == "") {
      this.save();
    } else {
      this.update();
    }

  }

  update() {
    this.comercialPlainService
      .update(this.product)
      .subscribe(
        this.cbSaveSuccess.bind(this),
        this.cbHandlerError.bind(this)
      );
  }

  save() {
    this.comercialPlainService
      .save(this.product)
      .subscribe(
        this.cbSaveSuccess.bind(this),
        this.cbHandlerError.bind(this)
      );

  }

  cbSaveSuccess(response) {
    this.getAll();
    return this.alertService.success('', 'Produto enviado com sucesso', 'OK');
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
